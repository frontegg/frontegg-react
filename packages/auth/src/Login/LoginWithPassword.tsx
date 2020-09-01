import React from 'react';
import { Field, FieldProps, Formik } from 'formik';
import { AuthActions, AuthState, LoginStep } from '../Api';
import { withAuth } from '../HOCs';
import {
  validateEmail,
  validateSchema,
  validatePassword,
  Button,
  Form,
  WithT, withT, Input,
} from '@frontegg/react-core';

const stateMapper = ({ loginState, isSSOAuth, onRedirectTo, routes }: AuthState) => ({ loginState, isSSOAuth, onRedirectTo, routes });
const actionsMapper = ({ preLogin, login, setLoginState, resetLoginState, setForgotPasswordState }: AuthActions) => ({
  preLogin,
  login,
  setLoginState,
  resetLoginState,
  setForgotPasswordState,
});

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT

class LoginWithPasswordComponent extends React.Component<Props> {
  backToPreLogin = () => this.props.setLoginState({ step: LoginStep.preLogin });

  forgetPasswordButton = () => {
    const { t, loginState: { loading }, setForgotPasswordState, resetLoginState, onRedirectTo, routes } = this.props;
    return <Field>
      {({ form: { values } }: FieldProps) => (
        <Button disabled={loading} type='button' className='fe-field-button' onClick={() => {
          setForgotPasswordState({ email: values.email });
          resetLoginState();
          onRedirectTo(routes.forgetPasswordUrl);
        }}>{t('auth.login.forgot-password')}</Button>
      )}
    </Field>;
  };

  render() {
    const {
      t,
      loginState: { loading, step, error },
      isSSOAuth,
      preLogin,
      login,
    } = this.props;

    const shouldDisplayPassword = !isSSOAuth || step === LoginStep.loginWithPassword;
    const shouldBackToLoginIfEmailChanged = isSSOAuth && shouldDisplayPassword;
    const validationSchema: any = { email: validateEmail(t) };
    if (shouldDisplayPassword) {
      validationSchema.password = validatePassword(t);
    }

    return <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validateSchema(validationSchema)}
      onSubmit={shouldDisplayPassword ?
        ({ email, password }) => login({ email, password }) :
        ({ email }) => preLogin({ email })
      }>
      <Form formik={true}>
        <Input
          inFormik={true}
          fullWidth={true}
          name='email'
          label={t('auth.login.email')}
          placeholder='name@example.com'
          onChange={shouldBackToLoginIfEmailChanged ? this.backToPreLogin : undefined}/>


        {shouldDisplayPassword &&
        <Input
          label={t('auth.login.password')}
          inFormik={true}
          fullWidth={true}
          type='password'
          name='password'
          placeholder={t('auth.login.enter-your-password')}
          disabled={!shouldDisplayPassword}/>}

          {/*{shouldDisplayPassword && <FieldInput*/}
        {/*  label={t('auth.login.password')}*/}
        {/*  labelButton={this.forgetPasswordButton()}*/}
        {/*  type='password'*/}
        {/*  name='password'*/}
        {/*  forwardRef={this.passwordField}*/}
        {/*  placeholder={t('auth.login.enter-your-password')}*/}
        {/*  disabled={!shouldDisplayPassword}/>}*/}

        <Button type='submit' fullWidth={true} variant={loading ? undefined : 'primary'} loading={loading}>
          {shouldDisplayPassword ? t('auth.login.login') : t('auth.login.continue')}
        </Button>
        {error && <div className='fe-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}

export const LoginWithPassword = withAuth(withT()(LoginWithPasswordComponent), stateMapper, actionsMapper);
