import React, { FC, useEffect, useRef } from 'react';
import { MFAStep } from '@frontegg/redux-store/auth';
import {
  validateSchema,
  validateTwoFactorCode,
  omitProps,
  RendererFunctionFC,
  useT,
  FForm,
  FFormik,
  Button,
  Grid,
  FButton,
  FCheckbox,
} from '@frontegg/react-core';
import { MFAVerifyStepErrorMessage, MFAVerifyStepForm, MFAVerifyStepMessage } from '../MFA/MFAVerifyStep';
import { useMfaActions, useMfaState, useLoginActions, useLoginState } from '@frontegg/react-hooks/auth';
import { MFARecoveryCodeStep } from '../MFA/MFARecoveryCodeStep';

const { Formik } = FFormik;
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export interface ForceEnrollMfaProps {
  renderer?: RendererFunctionFC<ForceEnrollMfaProps>;
}

export const ForceEnrollMfa: FC<ForceEnrollMfaProps> = (props) => {
  const { t } = useT();
  const { renderer } = props;
  const { requestAuthorize } = useLoginActions();
  const { step, loading, recoveryCode, mfaToken } = useMfaState();
  const { allowRememberMfaDevice, mfaDeviceExpiration } = useLoginState();
  const { setMfaState, verifyMfaAfterForce } = useMfaActions();

  const recoveryCodeRef = useRef<string>('');

  useEffect(() => {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(
      document.createTextNode(`:root {
      --fe-auth-container-width: 500px;
    }`)
    );
    head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    recoveryCodeRef.current = recoveryCode ?? '';
  });

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  if (step === MFAStep.recoveryCode) {
    return (
      <MFARecoveryCodeStep
        MFARecoveryCodeStepFooter={() => (
          <div className='fe-dialog__footer'>
            <div className='fe-flex-spacer' />
            <Button
              data-test-id='mfa-btn'
              variant='primary'
              className='fe-full-width'
              onClick={() => {
                requestAuthorize(true);
              }}
            >
              {t('common.continue')}
            </Button>
          </div>
        )}
      />
    );
  }

  return (
    <Formik
      validationSchema={validateSchema({
        token: validateTwoFactorCode(t),
      })}
      initialValues={{ token: '', rememberDevice: false }}
      onSubmit={async ({ token, rememberDevice }, { setSubmitting }) => {
        verifyMfaAfterForce({
          mfaToken: mfaToken || '',
          value: token,
          rememberDevice,
          callback: (success) => {
            if (success) {
              setMfaState({ recoveryCode });
            }
            setSubmitting(false);
          },
        });
      }}
    >
      <FForm>
        <MFAVerifyStepMessage>{t('auth.mfa.verify.forceMfaMessage')}</MFAVerifyStepMessage>
        <MFAVerifyStepForm />
        <MFAVerifyStepErrorMessage />
        {allowRememberMfaDevice && mfaDeviceExpiration && (
          <FCheckbox
            name='rememberDevice'
            className='fe-ml-2'
            label={t('auth.mfa.remember-this-device', {
              count: Math.floor(mfaDeviceExpiration / ONE_DAY_IN_SECONDS),
            })}
          />
        )}

        <div className='fe-dialog__footer'>
          <Grid container>
            <Grid xs item className='fe-text-align-end'>
              <FButton
                type='submit'
                size='large'
                fullWidth={true}
                variant='primary'
                loading={loading}
                data-test-id='sumbit-btn'
              >
                {t('common.verify')}
              </FButton>
            </Grid>
          </Grid>
        </div>
      </FForm>
    </Formik>
  );
};
