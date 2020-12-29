import React, { FC } from 'react';
import {
  omitProps,
  validateSchema,
  validateTwoFactorRecoveryCode,
  ErrorMessage,
  RendererFunctionFC,
  useT,
  FInput,
  FButton,
  FForm,
  FFormik,
} from '@frontegg/react-core';
import { useAuth } from '../hooks';

const { Formik } = FFormik;

export interface RecoverTwoFactorProps {
  renderer?: RendererFunctionFC<RecoverTwoFactorProps>;
}

export const RecoverTwoFactor: FC<RecoverTwoFactorProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { loading, error, email, recoverMfa } = useAuth((state) => state.loginState);

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  return (
    <Formik
      initialValues={{ code: '' }}
      validationSchema={validateSchema({
        code: validateTwoFactorRecoveryCode(t),
      })}
      onSubmit={async ({ code }) => recoverMfa({ email: email ?? '', recoveryCode: code })}
    >
      <FForm>
        <FInput name='code' label={t('auth.login.please-enter-the-recovery-code')} />

        <FButton type='submit' variant='primary' loading={loading} data-test-id="submit-btn"> 
          {t('auth.login.disable-mfa')}
        </FButton>
        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
