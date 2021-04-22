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
import { useAuth, useAuthActions } from '@frontegg/react-hooks/auth';

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
  shouldSetPassword: boolean;
}

export const ActivateAccountForm: FC<ActivateAccountFormProps> = (props) => {
  const [logoutLoader, setLogoutLoader] = useState(true);
  const { renderer, userId, token, shouldSetPassword } = props;
  const { t } = useT();
  const { activateAccount, loadPasswordConfig, resetForgotPasswordState, silentLogout } = useAuthActions();
  const {
    activateState: { loading: activateStateLoading, error },
    forgotPasswordState: { passwordConfig },
  } = useAuth(stateMapper);

  const logoutCallback = useCallback(() => {
    setLogoutLoader(false);
    if (!shouldSetPassword) {
      activateAccount({ userId, token });
    }
  }, [shouldSetPassword, userId, token]);

  useEffect((): (() => void) => {
    silentLogout(logoutCallback);
    loadPasswordConfig({ userId });
    return resetForgotPasswordState;
  }, [silentLogout, loadPasswordConfig, resetForgotPasswordState, logoutCallback, userId]);

  const loading = logoutLoader || activateStateLoading;

  if (renderer) {
    return createElement(renderer, { ...props, loading, error, passwordConfig } as any);
  }

  if (!shouldSetPassword && loading) {
    return <Loader />;
  }

  return (
    <Formik
      validationSchema={validateSchema({
        password: validatePasswordUsingOWASP(passwordConfig),
        confirmPassword: validatePasswordConfirmation(t),
      })}
      enableReinitialize={true}
      initialValues={{ password: '', confirmPassword: '' }}
      onSubmit={async ({ password }) => activateAccount({ userId, token, password })}
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
        <FButton type='submit' loading={loading} variant='primary' data-test-id='activate-btn'>
          {t('auth.activate-account.activate-account-button')}
        </FButton>
        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
