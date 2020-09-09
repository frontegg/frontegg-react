import React, { FC } from 'react';
import { Formik } from 'formik';
import {
  validateSchema,
  validateTwoFactorCode,
  omitProps,
  Button,
  ErrorMessage,
  RendererFunctionFC,
  useT,
  FForm,
  FInput,
  FButton,
} from '@frontegg/react-core';
import { AuthActions, AuthState, LoginStep } from '../Api';
import { useAuth } from '../hooks';

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
        <FInput label={t('auth.login.please-enter-the-6-digit-code')} name='code' />

        <FButton submit variant='primary' loading={loading}>
          {t('auth.login.login')}
        </FButton>

        <div className='fe-note'>
          <div className='fe-note-title'>{t('auth.login.disable-two-factor-title')}</div>
          <div className='fe-note-description'>
            <Button
              className='fe-link-button'
              testId='recover-two-factor-button'
              onClick={() => {
                setLoginState({ step: LoginStep.recoverTwoFactor });
              }}
            >
              {t('common.click-here')}
            </Button>
            &nbsp;
            {t('auth.login.disable-two-factor-description')}
          </div>
        </div>

        <ErrorMessage error={error} />
      </FForm>
    </Formik>
  );
};
