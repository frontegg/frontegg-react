import React, { FC } from 'react';
import { Formik } from 'formik';
import {
  RendererFunctionFC,
  useT,
  Form,
  Button,
  Input,
  validateEmail,
  validateSchema,
  ErrorMessage,
  omitProps,
} from '@frontegg/react-core';
import { useAuth } from '../hooks';

export interface ForgotPasswordFormProps {
  renderer?: RendererFunctionFC<ForgotPasswordFormProps>;
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { loading, email, error, forgotPassword } = useAuth(({ forgetPasswordState }) => forgetPasswordState);
  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return (
    <Formik
      initialValues={{ email }}
      validationSchema={validateSchema({
        email: validateEmail(t),
      })}
      isInitialValid={validateEmail(t).isValidSync(email)}
      onSubmit={({ email }) => forgotPassword({ email })}
    >
      <Form>
        <Input
          inFormik
          defaultValue={email}
          name='email'
          placeholder='name@example.com'
          label={t('auth.forgot-password.email-label')}
        />
        <Button inFormik submit fullWidth formikDisableIfNotDirty={false} variant='primary' loading={loading}>
          {t('auth.forgot-password.remind-me')}
        </Button>
        <ErrorMessage error={error} />
      </Form>
    </Formik>
  );
};
