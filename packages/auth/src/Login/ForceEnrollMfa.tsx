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
  useDialog,
  Button,
} from '@frontegg/react-core';
import { AuthState, MFAStep } from '../Api';
import {
  MFAVerifyStepErrorMessage,
  MFAVerifyStepFooter,
  MFAVerifyStepForm,
  MFAVerifyStepMessage,
} from '../MFA/MFAVerifyStep';
import { useAuthMfaState } from '../MFA/hooks';
import { MFARecoveryCodeStep } from '../MFA/MFARecoveryCodeStep';
import { verifyMfa } from '@frontegg/rest-api/dist/auth';
import { useAuth, useAuthActions } from '../hooks';

const { Formik } = FFormik;

const stateMapper = ({ loginState }: AuthState) => ({ ...loginState });

export interface ForceEnrollMfaProps {
  renderer?: RendererFunctionFC<ForceEnrollMfaProps>;
}

export const ForceEnrollMfa: FC<ForceEnrollMfaProps> = (props) => {
  const { t } = useT();
  const { renderer } = props;
  const { requestAuthorize } = useAuthActions();
  const { step } = useAuthMfaState();

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
        <MFAVerifyStepFooter />
      </FForm>
    </Formik>
  );
};
