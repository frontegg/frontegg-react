import React, { FC } from 'react';
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
import { AuthState } from '../Api';
import { useAuth } from '../hooks';
import { LoginStep } from '../Api/LoginState';

const { Formik } = FFormik;

const stateMapper = ({ loginState }: AuthState) => ({ ...loginState });

export interface LoginWithTwoFactorProps {
  renderer?: RendererFunctionFC<LoginWithTwoFactorProps>;
}

export const LoginWithTwoFactor: FC<LoginWithTwoFactorProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { loading, error, mfaToken, loginWithMfa, setLoginState } = useAuth(stateMapper);

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  return (
    <Formik
      initialValues={{ code: '' }}
      validationSchema={validateSchema({
        code: validateTwoFactorCode(t),
      })}
      onSubmit={async ({ code }) => loginWithMfa({ mfaToken: mfaToken || '', value: code })}
    >
      <FForm>
        <FInput aria-autocomplete={'none'} label={t('auth.login.please-enter-the-6-digit-code')} name='code' />

        <FButton type='submit' variant='primary' loading={loading}>
          {t('auth.login.login')}
        </FButton>

        <div className='fe-note'>
          <div className='fe-note-title'>{t('auth.login.disable-two-factor-title')}</div>
          <div className='fe-note-description'>
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
