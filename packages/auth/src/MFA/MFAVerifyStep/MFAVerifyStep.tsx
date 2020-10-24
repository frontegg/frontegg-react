import React, { FC } from 'react';
import { FFormik, FForm, useT, validateSchema, validateTwoFactorCode } from '@frontegg/react-core';
import { useAuth } from '../../hooks';
import { HideOption } from '../../interfaces';
import { MFAVerifyStepMessage } from './MFAVerifyStepMessage';
import { MFAVerifyStepForm } from './MFAVerifyStepForm';
import { MFAVerifyStepErrorMessage } from './MFAVerifyStepErrorMessage';
import { MFAVerifyStepFooter } from './MFAVerifyStepFooter';
import { MFAStep } from '../../Api/MfaState';
import { useAuthMfaActions, useAuthMfaState } from '../hooks';

const { Formik } = FFormik;

export const MFAVerifyStep: FC<HideOption> = (props) => {
  const { t } = useT();
  const { step } = useAuthMfaState(({ step }) => ({ step }));
  const { verifyMfa } = useAuthMfaActions();

  if (step !== MFAStep.verify) {
    return null;
  }
  const children = props.children ?? (
    <>
      <MFAVerifyStepMessage />
      <MFAVerifyStepForm />
      <MFAVerifyStepErrorMessage />
      <MFAVerifyStepFooter />
    </>
  );

  return (
    <div className='fe-mfa__verify-step'>
      <Formik
        validationSchema={validateSchema({
          token: validateTwoFactorCode(t),
        })}
        initialValues={{ token: '' }}
        onSubmit={async ({ token }) => verifyMfa({ token })}
      >
        <FForm>{children}</FForm>
      </Formik>
    </div>
  );
};
