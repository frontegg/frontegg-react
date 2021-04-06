import React, { ComponentType, createElement, FC, useEffect, useState } from 'react';
import { AuthActions, AuthState } from '../Api';
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
} from '@frontegg/react-core';
import { useAuth, useAuthActions } from '../hooks';
import { SocialLoginsLoginWithWrapper } from '../SocialLogins';

const { Formik } = FFormik;

const stateMapper = ({ activateState, forgotPasswordState }: AuthState) => ({ activateState, forgotPasswordState });

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
  const { activateAccount, loadPasswordConfig, resetForgotPasswordState, silentLogout } = useAuthActions();
  const {
    activateState: { loading: activateStateLoading, error },
    forgotPasswordState: { passwordConfig },
  } = useAuth(stateMapper);

  useEffect((): (() => void) => {
    silentLogout(() => setLogoutLoader(false));
    loadPasswordConfig({ userId });
    return resetForgotPasswordState;
  }, [silentLogout, loadPasswordConfig, resetForgotPasswordState, userId]);

  const loading = logoutLoader || activateStateLoading;

  if (renderer) {
    return createElement(renderer, { ...props, loading, error, passwordConfig } as any);
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
        <SocialLoginsLoginWithWrapper />
      </FForm>
    </Formik>
  );
};
