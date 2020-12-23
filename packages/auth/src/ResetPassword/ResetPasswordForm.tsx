import React, { FC } from 'react';
import {
  omitProps,
  validatePassword,
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
import { useAuth } from '../hooks';

const { Formik } = FFormik;

export interface ResetPasswordFormProps {
  renderer?: RendererFunctionFC<ResetPasswordFormProps>;
  userId: string;
  token: string;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = (props) => {
  const { renderer, userId, token } = props;
  const { t } = useT();
  const { loading, error, resetPassword } = useAuth(({ forgotPasswordState }) => forgotPasswordState);

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return (
    <Formik
      validationSchema={validateSchema({
        password: validatePassword(t),
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
          data-test-id="newPass-box"
        />
        <FInput
          type='password'
          name='confirmPassword'
          label={t('auth.forgot-password.confirm-new-password')}
          placeholder={t('auth.forgot-password.enter-your-password-again')}
          data-test-id="confirmPass-box"
        />
        <FButton type='submit' loading={loading} variant='primary' data-test-id="resetPass-submit-btn">
          {t('auth.forgot-password.reset-password-button')}
        </FButton>
        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
