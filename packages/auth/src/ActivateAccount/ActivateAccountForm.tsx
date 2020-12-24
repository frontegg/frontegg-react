import React, { ComponentType, createElement, FC } from 'react';
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
} from '@frontegg/react-core';
import { useAuth } from '../hooks';

const { Formik } = FFormik;

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
          data-test-id="password-box"
        />
        <FInput
          type='password'
          name='confirmPassword'
          label={t('auth.activate-account.confirm-new-password')}
          placeholder={t('auth.activate-account.enter-your-password-again')}
          data-test-id="confirmPassword-box"
        />
        <FButton type='submit' loading={loading} variant='primary'>
          {t('auth.activate-account.activate-account-button')}
          data-test-id="activate-btn"
        </FButton>
        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
