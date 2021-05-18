import {
  ErrorMessage,
  FButton,
  FCheckbox,
  FForm,
  FFormik,
  FInput,
  omitProps,
  RendererFunctionFC,
  useT,
  validateSchema,
  validateTwoFactorCode,
} from '@frontegg/react-core';
import { useLoginActions, useLoginState } from '@frontegg/react-hooks/auth';
import { LoginStep } from '@frontegg/redux-store/auth';
import React, { FC } from 'react';

const { Formik } = FFormik;
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
export interface LoginWithTwoFactorProps {
  renderer?: RendererFunctionFC<LoginWithTwoFactorProps>;
}

export const LoginWithTwoFactor: FC<LoginWithTwoFactorProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { loading, error, mfaToken, allowRememberMfaDevice, mfaDeviceExpiration } = useLoginState();
  const { loginWithMfa, setLoginState } = useLoginActions();

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  return (
    <Formik
      initialValues={{ code: '', rememberDevice: false }}
      validationSchema={validateSchema({
        code: validateTwoFactorCode(t),
      })}
      onSubmit={async ({ code, rememberDevice }, { setSubmitting }) =>
        loginWithMfa({ mfaToken: mfaToken || '', value: code, rememberDevice, callback: () => setSubmitting(false) })
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
        {allowRememberMfaDevice && mfaDeviceExpiration && (
          <FCheckbox
            name='rememberDevice'
            label={t('auth.mfa.remember-this-device', {
              count: Math.floor(mfaDeviceExpiration / ONE_DAY_IN_SECONDS),
            })}
          />
        )}

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
