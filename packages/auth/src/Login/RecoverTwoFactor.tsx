import React, { FC } from 'react';
import { Formik } from 'formik';
import {
  Form, Input, Button, omitProps, validateSchema, validateTwoFactorRecoveryCode,
  ErrorMessage, RendererFunctionFC, useT,
} from '@frontegg/react-core';
import { useAuth } from '../hooks';

export interface RecoverTwoFactorProps {
  renderer?: RendererFunctionFC<RecoverTwoFactorProps>
}

export const RecoverTwoFactor: FC<RecoverTwoFactorProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { loading, error, email, recoverMfa } = useAuth(state => state.loginState);

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  return <Formik
    initialValues={{ code: '' }}
    validationSchema={validateSchema({
      code: validateTwoFactorRecoveryCode(t),
    })}
    onSubmit={({ code }) => recoverMfa({ email: email ?? '', recoveryCode: code })}
  >
    <Form inFormik>
      <Input inFormik fullWidth name='code'
             label={t('auth.login.please-enter-the-recovery-code')}/>

      <Button submit inFormik fullWidth variant='primary' loading={loading}>
        {t('auth.login.disable-mfa')}
      </Button>
      <ErrorMessage error={error}/>
    </Form>
  </Formik>;
};
