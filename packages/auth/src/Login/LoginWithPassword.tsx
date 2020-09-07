import React, { FC } from 'react';
import { Formik } from 'formik';
import { AuthState, LoginStep } from '../Api';
import {
  validateEmail,
  validateSchema,
  validatePassword,
  Button,
  Form,
  Input,
  omitProps,
  ErrorMessage,
  RendererFunctionFC,
  useT,
} from '@frontegg/react-core';
import { useAuth } from '../hooks';

const stateMapper = ({ loginState, isSSOAuth, onRedirectTo, routes }: AuthState) => ({
  ...loginState,
  isSSOAuth,
  onRedirectTo,
  routes,
});

export interface LoginWithPasswordProps {
  renderer?: RendererFunctionFC<LoginWithPasswordProps>;
}

export const LoginWithPassword: FC<LoginWithPasswordProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const {
    loading,
    step,
    error,
    isSSOAuth,
    routes,
    setLoginState,
    login,
    preLogin,
    setForgotPasswordState,
    resetLoginState,
    onRedirectTo,
  } = useAuth(stateMapper);
  const backToPreLogin = () => setLoginState({ step: LoginStep.preLogin });
  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  const shouldDisplayPassword = !isSSOAuth || step === LoginStep.loginWithPassword;
  const shouldBackToLoginIfEmailChanged = isSSOAuth && shouldDisplayPassword;
  const validationSchema: any = { email: validateEmail(t) };
  if (shouldDisplayPassword) {
    validationSchema.password = validatePassword(t);
  }

  const labelButtonProps = (values: any) => ({
    disabled: loading,
    testId: 'forgot-password-button',
    onClick: () => {
      setForgotPasswordState({ email: values.email });
      resetLoginState();
      onRedirectTo(routes.forgetPasswordUrl);
    },
    children: t('auth.login.forgot-password'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validateSchema(validationSchema)}
      onSubmit={
        shouldDisplayPassword ? ({ email, password }) => login({ email, password }) : ({ email }) => preLogin({ email })
      }
    >
      {({ values }) => (
        <Form inFormik>
          <Input
            inFormik={true}
            fullWidth={true}
            name='email'
            label={t('auth.login.email')}
            placeholder='name@example.com'
            onChange={shouldBackToLoginIfEmailChanged ? backToPreLogin : undefined}
          />

          {shouldDisplayPassword && (
            <Input
              label={t('auth.login.password')}
              labelButton={labelButtonProps(values)}
              inFormik
              fullWidth
              type='password'
              name='password'
              placeholder={t('auth.login.enter-your-password')}
              disabled={!shouldDisplayPassword}
            />
          )}

          <Button submit inFormik fullWidth variant={'primary'} loading={loading}>
            {shouldDisplayPassword ? t('auth.login.login') : t('auth.login.continue')}
          </Button>

          <ErrorMessage error={error} />
        </Form>
      )}
    </Formik>
  );
};
