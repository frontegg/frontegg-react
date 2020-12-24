import React, { FC, useEffect, useRef } from 'react';
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
import { AuthState, MFAStep } from '../Api';
import { MFAVerifyStepErrorMessage, MFAVerifyStepForm, MFAVerifyStepMessage } from '../MFA/MFAVerifyStep';
import { useAuthMfaActions, useAuthMfaState } from '../MFA/hooks';
import { MFARecoveryCodeStep } from '../MFA/MFARecoveryCodeStep';
import { useAuthActions } from '../hooks';

const { Formik } = FFormik;

export interface ForceEnrollMfaProps {
  renderer?: RendererFunctionFC<ForceEnrollMfaProps>;
}

export const ForceEnrollMfa: FC<ForceEnrollMfaProps> = (props) => {
  const { t } = useT();
  const { renderer } = props;
  const { requestAuthorize } = useAuthActions();
  const { step, loading } = useAuthMfaState();
  const { verifyMfa } = useAuthMfaActions();

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

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  if (step === MFAStep.recoveryCode) {
    return (
      <MFARecoveryCodeStep
        MFARecoveryCodeStepFooter={() => (
          <div className='fe-dialog__footer'>
            <Button
              variant='primary'
              onClick={() => {
                requestAuthorize();
              }}
            >
              {t('common.done')}
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
        verifyMfa({
          token,
          callback: (success) => {
            setSubmitting(false);
          },
        });
      }}
    >
      <FForm>
        <MFAVerifyStepMessage />
        <MFAVerifyStepForm />
        <MFAVerifyStepErrorMessage />

        <div className='fe-dialog__footer'>
          <Grid container>
            <Grid xs item className='fe-text-align-end'>
              <FButton type='submit' size='large' fullWidth={false} variant='primary' loading={loading}>
                {t('common.verify')}
              </FButton>
            </Grid>
          </Grid>
        </div>
      </FForm>
    </Formik>
  );
};
