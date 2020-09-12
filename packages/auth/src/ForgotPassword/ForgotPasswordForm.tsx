import React, { ComponentType, createElement, FC } from 'react';
import {
  useT,
  validateEmail,
  validateSchema,
  ErrorMessage,
  FForm,
  FInput,
  FButton,
  FFormik,
} from '@frontegg/react-core';
import { useAuth } from '../hooks';
import { AuthState } from '../Api';

const { Formik } = FFormik;

type ForgotPasswordFormRendererProps = Omit<ForgotPasswordFormProps, 'renderer'> & ReturnType<typeof stateMapper>;

export interface ForgotPasswordFormProps {
  renderer?: ComponentType<ForgotPasswordFormRendererProps>;
}

const stateMapper = ({ forgetPasswordState }: AuthState) => forgetPasswordState;
export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const authState = useAuth(stateMapper);
  const { loading, email, error, forgotPassword } = authState;
  if (renderer) {
    return createElement(renderer, { ...props, ...authState });
  }
  return (
    <Formik
      initialValues={{ email }}
      validationSchema={validateSchema({ email: validateEmail(t) })}
      isInitialValid={validateEmail(t).isValidSync(email)}
      onSubmit={async ({ email }) => forgotPassword({ email })}
    >
      <FForm>
        <FInput
          defaultValue={email}
          name='email'
          placeholder='name@example.com'
          label={t('auth.forgot-password.email-label')}
        />
        <FButton submit formikDisableIfNotDirty={false} variant='primary' loading={loading}>
          {t('auth.forgot-password.remind-me')}
        </FButton>
        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
