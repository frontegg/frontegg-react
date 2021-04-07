import React, { FC } from 'react';
import {
  omitProps,
  validatePasswordUsingOWASP,
  validatePasswordConfirmation,
  validateSchema,
  ErrorMessage,
  useT,
  RendererFunctionFC,
  FInput,
  FButton,
  FForm,
  FFormik,
} from '@frontegg/react-core';
import { useForgotPasswordActions, useForgotPasswordState } from '@frontegg/react-hooks/auth';

const { Formik } = FFormik;

export interface ResetPasswordFormProps {
  renderer?: RendererFunctionFC<ResetPasswordFormProps>;
  userId: string;
  token: string;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = (props) => {
  const { renderer, userId, token } = props;
  const { t } = useT();
  const { loading, error, passwordConfig } = useForgotPasswordState();
  const { resetPassword } = useForgotPasswordActions();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  return (
    <Formik
      validationSchema={validateSchema({
        password: validatePasswordUsingOWASP(passwordConfig),
        confirmPassword: validatePasswordConfirmation(t),
      })}
      enableReinitialize
      initialValues={{ password: '', confirmPassword: '' }}
      onSubmit={async ({ password }) => resetPassword({ userId, token, password })}
    >
      <FForm>
        <FInput
          type='password'
          name='password'
          label={t('auth.forgot-password.new-password')}
          placeholder={t('auth.forgot-password.enter-your-password')}
          data-test-id='newPass-box'
        />
        <FInput
          type='password'
          name='confirmPassword'
          label={t('auth.forgot-password.confirm-new-password')}
          placeholder={t('auth.forgot-password.enter-your-password-again')}
          data-test-id='repeatPass-box'
        />
        <FButton type='submit' loading={loading} variant='primary' data-test-id='resetPass-submit-btn'>
          {t('auth.forgot-password.reset-password-button')}
        </FButton>
        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
