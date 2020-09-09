import React, { ComponentType, createElement, FC } from 'react';
import { AuthActions, AuthState } from '../Api';
import { Formik } from 'formik';
import {
  validatePassword,
  validatePasswordConfirmation,
  validateSchema,
  ErrorMessage,
  FForm,
  FButton,
  FInput,
  useT,
} from '@frontegg/react-core';
import { useAuth } from '../hooks';

const stateMapper = ({ activateState }: AuthState) => ({ activateState });

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
  } = authState;
  if (renderer) {
    return createElement(renderer, { ...props, ...authState });
  }

  return (
    <Formik
      validationSchema={validateSchema({
        password: validatePassword(t),
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
        />
        <FInput
          type='password'
          name='confirmPassword'
          label={t('auth.activate-account.confirm-new-password')}
          placeholder={t('auth.activate-account.enter-your-password-again')}
        />
        <FButton submit loading={loading} variant='primary'>
          {t('auth.activate-account.activate-account-button')}
        </FButton>
        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
