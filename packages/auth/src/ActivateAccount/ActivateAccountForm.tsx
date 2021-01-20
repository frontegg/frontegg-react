import React, { ComponentType, createElement, FC, useEffect } from 'react';
import { AuthActions, AuthState } from '../Api';
import {
  validatePassword,
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
import { useAuth } from '../hooks';
import { SocialLoginsActions, SocialLoginsWithWrapper } from '../SocialLogins';

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
  const { renderer, userId, token } = props;
  const { t } = useT();
  const authState = useAuth(stateMapper);
  const {
    activateState: { loading, error },
    activateAccount,
    forgotPasswordState: { passwordConfig },
    loadPasswordConfig,
    resetForgotPasswordState,
  } = authState;
  if (renderer) {
    return createElement(renderer, { ...props, ...authState });
  }

  useEffect((): (() => void) => {
    loadPasswordConfig();
    return resetForgotPasswordState;
  }, []);

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
        <SocialLoginsWithWrapper action={SocialLoginsActions.Login} />
      </FForm>
    </Formik>
  );
};
