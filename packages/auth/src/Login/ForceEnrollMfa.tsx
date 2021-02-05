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
} from '@frontegg/react-core';
import { MFAVerifyStepErrorMessage, MFAVerifyStepForm, MFAVerifyStepMessage } from '../MFA/MFAVerifyStep';
import { useMfaActions, useMfaState } from '../MFA';
import { MFARecoveryCodeStep } from '../MFA/MFARecoveryCodeStep';
import { useLoginActions } from './hooks';

const { Formik } = FFormik;

export interface ForceEnrollMfaProps {
  renderer?: RendererFunctionFC<ForceEnrollMfaProps>;
}

export const ForceEnrollMfa: FC<ForceEnrollMfaProps> = (props) => {
  const { t } = useT();
  const { renderer } = props;
  const { requestAuthorize } = useLoginActions();
  const { step, loading, recoveryCode, mfaToken } = useMfaState();
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
      initialValues={{ token: '' }}
      onSubmit={async ({ token }, { setSubmitting }) => {
        verifyMfaAfterForce({
          mfaToken: mfaToken || '',
          value: token,
          callback: (success: boolean | null) => {
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
