import React, { ContextType, createRef } from 'react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { AuthContext } from '../AuthContext';
import { validateEmail, validatePassword, validateSchema } from '../helpers/validates';
import { FieldInput } from '../FieldInput';
import { FieldButton } from '../FieldInput/FieldButton';
import { LoginStep } from '../Api';
import { Button } from 'semantic-ui-react';

export class LoginWithPasswordComponent extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  passwordField = createRef<HTMLInputElement>();
  lastLoginStep = LoginStep.preLogin;

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
    const { loginState, isSSOAuth } = this.context!;
    if (this.lastLoginStep != loginState.step && isSSOAuth && this.passwordField.current) {
      this.lastLoginStep = this.context!.loginState.step;
      this.passwordField.current.focus();
    }
  }

  render() {
    const {
      loginState: { loading, step, error }, isSSOAuth, preLogin, login,
      setLoginState, resetLoginState, setForgotPasswordState,
      onRedirectTo, forgetPasswordUrl,
    } = this.context!;

    const displayPassword = !isSSOAuth || step == LoginStep.loginWithPassword;
    const passwordLabel = <>
      Password
      <Field>
        {({ form: { values } }: FieldProps) => (
          <Button disabled={loading} type='button' className='fe-field-button' onClick={() => {
            setForgotPasswordState({ email: values['email'] });
            resetLoginState();
            onRedirectTo(forgetPasswordUrl);
          }}>Forgot Password?</Button>
        )}
      </Field>
    </>;
    return <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validateSchema(
        displayPassword ? {
          email: validateEmail,
          password: validatePassword,
        } : {
          email: validateEmail,
        })}
      onSubmit={({ email, password }) => displayPassword ? login({ email, password }) : preLogin({ email })}
    >
      <Form>
        <FieldInput name='email'
                    placeholder='name@example.com'
                    label={'Email'}
                    focus={isSSOAuth && displayPassword ? false : undefined}
                    onChange={isSSOAuth && displayPassword ? () => {setLoginState({ step: LoginStep.preLogin });} : undefined}/>
        {displayPassword && <FieldInput label={passwordLabel}
                                        type='password'
                                        wrapperClassName={'fe-hidden-element'}
                                        forwardRef={this.passwordField}
                                        name='password'
                                        placeholder='Enter your password'
                                        disabled={!displayPassword}/>}

        <FieldButton fluid={true} primary={!loading} loading={loading}>{displayPassword ? 'Login' : 'Continue'} </FieldButton>
        {error && <div className='fe-login-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}
