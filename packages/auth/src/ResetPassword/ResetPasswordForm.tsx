import React, { FC } from 'react';
import { Formik } from 'formik';
import {
  Form,
  Button,
  Input,
  omitProps,
  validatePassword,
  validatePasswordConfirmation,
  validateSchema,
  ErrorMessage,
  useT,
  RendererFunctionFC,
} from '@frontegg/react-core';
import { useAuth } from '../hooks';

export interface ResetPasswordFormProps {
  renderer?: RendererFunctionFC<ResetPasswordFormProps>;
  userId: string;
  token: string;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = (props) => {
  const { renderer, userId, token } = props;
  const { t } = useT();
  const { loading, error, resetPassword } = useAuth(({ forgetPasswordState }) => forgetPasswordState);

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
      onSubmit={({ password }) => resetPassword({ userId, token, password })}
    >
      <Form>
        <Input
          inFormik
          type='password'
          name='password'
          label={t('auth.forgot-password.new-password')}
          placeholder={t('auth.forgot-password.enter-your-password')}
        />
        <Input
          inFormik
          type='password'
          name='confirmPassword'
          label={t('auth.forgot-password.confirm-new-password')}
          placeholder={t('auth.forgot-password.enter-your-password-again')}
        />
        <Button inFormik type='submit' fullWidth loading={loading} variant='primary'>
          {t('auth.forgot-password.reset-password-button')}
        </Button>
        <ErrorMessage error={error} />
      </Form>
    </Formik>
  );
};
