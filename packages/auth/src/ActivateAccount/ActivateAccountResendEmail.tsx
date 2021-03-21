import React, { ComponentType, createElement, FC } from 'react';
import { AuthActions, AuthState } from '../Api';
import {
  validateSchema,
  ErrorMessage,
  FForm,
  FButton,
  FInput,
  useT,
  FFormik,
  validateEmail,
  Button,
} from '@frontegg/react-core';
import { useAuth, useAuthActions } from '../hooks';

const { Formik } = FFormik;

const stateMapper = ({ activateState, routes, onRedirectTo }: AuthState) => ({ activateState, routes, onRedirectTo });

export type ActivateAccountFormRendererProps = Omit<ActivateAccountResendEmailProps, 'renderer'> &
  ReturnType<typeof stateMapper> &
  Pick<AuthActions, 'resendActivationEmail'>;

export interface ActivateAccountResendEmailProps {
  renderer?: ComponentType<ActivateAccountFormRendererProps>;
}

export const ActivateAccountResendEmail: FC<ActivateAccountResendEmailProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { resendActivationEmail } = useAuthActions();
  const {
    activateState: { loading, error, resentEmail },
    resetActivateState,
    routes,
    onRedirectTo,
  } = useAuth(stateMapper);

  if (renderer) {
    return createElement(renderer, { ...props, loading, error } as any);
  }

  return resentEmail ? (
    <div className='fe-success-message fe-dflex fe-dflex-space-between fe-dflex-column'>
      {t('auth.activate-account.request-sent')}
      <Button
        data-test-id='activate-btn'
        fullWidth
        onClick={() => {
          resetActivateState();
          onRedirectTo(routes.loginUrl);
        }}
      >
        {t('auth.activate-account.back-to-login')}
      </Button>
    </div>
  ) : (
    <Formik
      validationSchema={validateSchema({
        email: validateEmail(t),
      })}
      initialValues={{ email: '' }}
      onSubmit={async ({ email }) => resendActivationEmail({ email })}
    >
      <FForm>
        <FInput
          type='text'
          name='email'
          label={t('common.email')}
          placeholder={t('common.email')}
          data-test-id='resendEmail-box'
        />
        <FButton type='submit' loading={loading} variant='primary' data-test-id='resend-btn'>
          {t('auth.activate-account.send')}
        </FButton>
        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
