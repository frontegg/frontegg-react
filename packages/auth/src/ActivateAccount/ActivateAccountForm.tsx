import React, { ComponentType, createElement, FC, useCallback, useEffect, useState } from 'react';
import { AuthActions, AuthState } from '@frontegg/redux-store/auth';
import {
  validatePasswordConfirmation,
  validateSchema,
  ErrorMessage,
  FForm,
  FButton,
  FInput,
  useT,
  FFormik,
  validatePasswordUsingOWASP,
  Loader,
} from '@frontegg/react-core';
import { IGetActivateAccountStrategyResponse } from '@frontegg/rest-api';
import { useAuth, useAuthActions } from '@frontegg/react-hooks/auth';
import { FReCaptcha } from '../components/FReCaptcha';

const { Formik } = FFormik;

const stateMapper = ({ activateState, forgotPasswordState, signUpState }: AuthState) => ({
  activateState,
  forgotPasswordState,
  signUpState,
});

export type ActivateAccountFormRendererProps = Omit<ActivateAccountFormProps, 'renderer'> &
  ReturnType<typeof stateMapper> &
  Pick<AuthActions, 'activateAccount'>;

export interface ActivateAccountFormProps {
  renderer?: ComponentType<ActivateAccountFormRendererProps>;
  userId: string;
  token: string;
}

export const ActivateAccountForm: FC<ActivateAccountFormProps> = (props) => {
  const [logoutLoader, setLogoutLoader] = useState(true);
  const { renderer, userId, token } = props;
  const { t } = useT();
  const {
    activateAccount,
    loadPasswordConfig,
    resetForgotPasswordState,
    silentLogout,
    getActivateAccountStrategy,
  } = useAuthActions();

  const {
    activateState: { loading: activateStateLoading, error, activationStrategy },
    forgotPasswordState: { passwordConfig },
  } = useAuth(stateMapper);

  useEffect((): (() => void) => {
    const logoutCallback = () => {
      setLogoutLoader(false);
      const callback = (data: IGetActivateAccountStrategyResponse | null) => {
        if (!data?.shouldSetPassword) {
          activateAccount({ userId, token });
        }
      };

      getActivateAccountStrategy({ userId, token, callback });
    };

    silentLogout(logoutCallback);
    loadPasswordConfig({ userId });
    return resetForgotPasswordState;
  }, [silentLogout, loadPasswordConfig, resetForgotPasswordState, getActivateAccountStrategy, userId, token]);

  const loading =
    logoutLoader ||
    activationStrategy.loading ||
    (!activationStrategy.strategy?.shouldSetPassword && activateStateLoading);

  if (renderer) {
    return createElement(renderer, { ...props, loading, error, passwordConfig } as any);
  }

  if (loading) {
    return <Loader center />;
  }

  if (activationStrategy.error) return <ErrorMessage error={activationStrategy.error} />;

  return (
    <Formik
      validationSchema={validateSchema({
        password: validatePasswordUsingOWASP(passwordConfig),
        confirmPassword: validatePasswordConfirmation(t),
      })}
      enableReinitialize={true}
      initialValues={{ password: '', confirmPassword: '', recaptchaToken: '' }}
      onSubmit={async ({ password, recaptchaToken }) => activateAccount({ userId, token, password, recaptchaToken })}
    >
      <FForm>
        <FInput
          type='password'
          name='password'
          label={t('auth.activate-account.new-password')}
          placeholder={t('auth.activate-account.enter-your-password')}
          data-test-id='password-box'
        />
        <FInput
          type='password'
          name='confirmPassword'
          label={t('auth.activate-account.confirm-new-password')}
          placeholder={t('auth.activate-account.enter-your-password-again')}
          data-test-id='confirmPassword-box'
        />
        <FButton type='submit' loading={activateStateLoading} variant='primary' data-test-id='activate-btn'>
          {t('auth.activate-account.activate-account-button')}
        </FButton>
        <ErrorMessage error={error} />
        <FReCaptcha action='activate_account' />
      </FForm>
    </Formik>
  );
};
