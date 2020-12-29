import React, { ComponentType, createElement, FC, useEffect } from 'react';
import { AuthActions, AuthState } from '../Api';
import { LoginStep } from '../Api/LoginState';
import {
  validateEmail,
  validateSchema,
  validatePassword,
  ErrorMessage,
  useT,
  FForm,
  FButton,
  FInput,
  FFormik,
} from '@frontegg/react-core';
import { useAuth } from '../hooks';

const { Formik } = FFormik;

const stateMapper = ({ loginState, isSSOAuth, onRedirectTo, routes }: AuthState) => ({
  ...loginState,
  isSSOAuth,
  onRedirectTo,
  routes,
});

export type LoginWithPasswordRendererProps = Omit<LoginWithPasswordProps, 'renderer'> &
  ReturnType<typeof stateMapper> &
  Pick<AuthActions, 'login' | 'preLogin'>;

export interface LoginWithPasswordProps {
  renderer?: ComponentType<LoginWithPasswordRendererProps>;
}

export const LoginWithPassword: FC<LoginWithPasswordProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const authState = useAuth(stateMapper);

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
  } = authState;
  const backToPreLogin = () => setLoginState({ step: LoginStep.preLogin });

  if (renderer) {
    return createElement(renderer, { ...props, ...authState });
  }
  const shouldDisplayPassword = !isSSOAuth || step === LoginStep.loginWithPassword;
  const shouldBackToLoginIfEmailChanged = isSSOAuth && shouldDisplayPassword;
  const validationSchema: any = { email: validateEmail(t) };
  if (shouldDisplayPassword) {
    validationSchema.password = validatePassword(t);
  }
  useEffect(() => {
    if (isSSOAuth && shouldDisplayPassword) {
      document.querySelector<HTMLInputElement>('input[name="password"]')?.focus?.();
    }
  }, [shouldDisplayPassword]);

  const labelButtonProps = (values: any) => ({
    testId: 'forgot-password-button',
    disabled: loading,
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
      onSubmit={async ({ email, password }) => {
        shouldDisplayPassword ? login({ email, password }) : preLogin({ email });
      }}
    >
      {({ values }) => (
        <FForm>
          <FInput
            name='email'
            type='email'
            size='large'
            label={t('auth.login.email')}
            placeholder='name@example.com'
            onChange={shouldBackToLoginIfEmailChanged ? backToPreLogin : undefined}
            data-testid='email-box'
          />

          {shouldDisplayPassword && (
            <FInput
              size='large'
              label={t('auth.login.password')}
              labelButton={labelButtonProps(values)}
              type='password'
              name='password'
              placeholder={t('auth.login.enter-your-password')}
              disabled={!shouldDisplayPassword}
              data-testid='passwors-box'
            />
          )}

          <FButton type='submit' fullWidth variant={'primary'} loading={loading} data-testid='submit-btn'>
            {shouldDisplayPassword ? t('auth.login.login') : t('auth.login.continue')}
          </FButton>

          <ErrorMessage separator error={error} />
        </FForm>
      )}
    </Formik>
  );
};
