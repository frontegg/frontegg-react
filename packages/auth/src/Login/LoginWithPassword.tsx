import React, { createRef } from 'react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { AuthActions, AuthState, LoginStep } from '../Api';
import { Button } from 'semantic-ui-react';
import { withAuth } from '../HOCs';
import {
  validateEmail,
  validateSchema,
  validatePassword,
  FieldInput,
  FieldButton,
} from '@frontegg/react-core';


const mapper = {
  state: ({ loginState, isSSOAuth, onRedirectTo, routes }: AuthState) => ({ loginState, isSSOAuth, onRedirectTo, routes }),
  actions: ({ preLogin, login, setLoginState, resetLoginState, setForgotPasswordState }: AuthActions) => ({
    preLogin,
    login,
    setLoginState,
    resetLoginState,
    setForgotPasswordState,
  }),
};

type Props = ReturnType<typeof mapper.state> & ReturnType<typeof mapper.actions>

class LoginWithPasswordComponent extends React.Component<Props> {

  passwordField = createRef<HTMLInputElement>();
  lastLoginStep = LoginStep.preLogin;

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
    const { loginState, isSSOAuth } = this.props;
    if (this.lastLoginStep !== loginState.step && isSSOAuth && this.passwordField.current) {
      this.lastLoginStep = loginState.step;
      this.passwordField.current.focus();
    }
  }

  render() {
    const {
      loginState: { loading, step, error },
      isSSOAuth,
      preLogin,
      login,
      setLoginState,
      resetLoginState,
      setForgotPasswordState,
      onRedirectTo,
      routes: { forgetPasswordUrl },
    } = this.props;

    const displayPassword = !isSSOAuth || step === LoginStep.loginWithPassword;
    const passwordLabel = <>
      Password
      <Field>
        {({ form: { values } }: FieldProps) => (
          <Button disabled={loading} type='button' className='fe-field-button' onClick={() => {
            setForgotPasswordState({ email: values.email });
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
        <FieldInput
          name='email'
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

export const LoginWithPassword = withAuth(LoginWithPasswordComponent, mapper);
