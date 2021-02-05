import React, { FC } from 'react';
import { LoginStep } from '@frontegg/redux-store/auth';
import {
  validateSchema,
  validateTwoFactorCode,
  omitProps,
  ErrorMessage,
  RendererFunctionFC,
  useT,
  FForm,
  FInput,
  FButton,
  FFormik,
} from '@frontegg/react-core';
import { useLoginActions, useLoginState } from './hooks';

const { Formik } = FFormik;

export interface LoginWithTwoFactorProps {
  renderer?: RendererFunctionFC<LoginWithTwoFactorProps>;
}

export const LoginWithTwoFactor: FC<LoginWithTwoFactorProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { loading, error, mfaToken } = useLoginState();
  const { loginWithMfa, setLoginState } = useLoginActions();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  return (
    <Formik
      initialValues={{ code: '' }}
      validationSchema={validateSchema({
        code: validateTwoFactorCode(t),
      })}
      onSubmit={async ({ code }, { setSubmitting }) =>
        loginWithMfa({ mfaToken: mfaToken || '', value: code, callback: () => setSubmitting(false) })
      }
    >
      <FForm>
        <FInput
          aria-autocomplete={'none'}
          autoComplete='off'
          autoFocus
          label={t('auth.login.please-enter-the-6-digit-code')}
          name='code'
        />

        <FButton type='submit' variant='primary' loading={loading} data-test-id='submit-btn'>
          {t('auth.login.login')}
        </FButton>

        <div className='fe-note'>
          <div className='fe-note-title'>{t('auth.login.disable-two-factor-title')}</div>
          <div className='fe-note-description fe-recover-two-factor'>
            <a
              test-id='recover-two-factor-button'
              onClick={() => {
                setLoginState({ step: LoginStep.recoverTwoFactor });
              }}
            >
              {t('common.click-here')}
            </a>
            &nbsp;
            {t('auth.login.disable-two-factor-description')}
          </div>
        </div>

        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
