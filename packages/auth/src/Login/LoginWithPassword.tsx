import React, { ComponentType, createElement, FC, useCallback, useEffect } from 'react';
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
import { FReCaptcha } from '../components/FReCaptcha';

const { Formik } = FFormik;

const stateMapper = ({ loginState, isSSOAuth, onRedirectTo, routes, signUpState }: AuthState) => ({
  ...loginState,
  isSSOAuth,
  onRedirectTo,
  routes,
  signUpState,
});

export type LoginWithPasswordRendererProps = Omit<LoginWithPasswordProps, 'renderer'> &
  ReturnType<typeof stateMapper> &
  Pick<AuthActions, 'login' | 'preLogin'>;

export interface LoginWithPasswordProps {
  renderer?: ComponentType<LoginWithPasswordRendererProps>;
}

const HideChildrenIfRequired: FC<{ hide: boolean }> = ({ hide, children }) => {
  if (hide) {
    return <span style={{ visibility: 'hidden', position: 'absolute' }}>{children}</span>;
  }
  return <>{children}</>;
};

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
    signUpState,
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
    'data-test-id': 'forgotPassBtn',
    disabled: loading,
    onClick: () => {
      setForgotPasswordState({ email: values.email });
      resetLoginState();
      onRedirectTo(routes.forgetPasswordUrl);
    },
    children: t('auth.login.forgot-password'),
  });

  const redirectToSignUp = useCallback(() => {
    onRedirectTo(routes.signUpUrl);
  }, []);

  const signUpMessage = !signUpState.allowSignUps ? null : (
    <div>
      {t('auth.login.suggest-sign-up.message')}
      <span onClick={redirectToSignUp} className={'fe-login-component__back-to-sign-up-link'} data-testid='email-box'>
        {t('auth.login.suggest-sign-up.sign-up-link')}
      </span>
    </div>
  );

  return (
    <>
      {signUpMessage}
      <Formik
        initialValues={{ email: '', password: '', recaptchaToken: '' }}
        validationSchema={validateSchema(validationSchema)}
        onSubmit={async ({ email, password, recaptchaToken }) => {
          shouldDisplayPassword ? login({ email, password, recaptchaToken }) : preLogin({ email });
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

            <HideChildrenIfRequired hide={!shouldDisplayPassword}>
              <FInput
                size='large'
                label={t('auth.login.password')}
                labelButton={labelButtonProps(values)}
                type='password'
                name='password'
                tabIndex={shouldDisplayPassword ? undefined : -1}
                placeholder={t('auth.login.enter-your-password')}
                data-testid='password-box'
              />
            </HideChildrenIfRequired>

            <FButton type='submit' fullWidth variant={'primary'} loading={loading} data-testid='sumbit-btn'>
              {shouldDisplayPassword ? t('auth.login.login') : t('auth.login.continue')}
            </FButton>

            <ErrorMessage separator error={error} />
            <FReCaptcha action='login' />
          </FForm>
        )}
      </Formik>
    </>
  );
};
