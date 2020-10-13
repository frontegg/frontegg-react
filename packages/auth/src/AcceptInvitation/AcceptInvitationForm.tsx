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

export type AcceptInvitationFormRendererProps = Omit<AcceptInvitationFormProps, 'renderer'> &
  ReturnType<typeof stateMapper> &
  Pick<AuthActions, 'activateAccount'>;

export interface AcceptInvitationFormProps {
  renderer?: ComponentType<AcceptInvitationFormRendererProps>;
  userId: string;
  token: string;
}

export const AcceptInvitationForm: FC<AcceptInvitationFormProps> = (props) => {
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
        <FButton type='submit' loading={loading} variant='primary'>
          {t('auth.activate-account.activate-account-button')}
        </FButton>
        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
