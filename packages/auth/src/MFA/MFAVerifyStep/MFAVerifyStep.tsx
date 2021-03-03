import React, { FC } from 'react';
import { FFormik, FForm, useT, validateSchema, validateTwoFactorCode } from '@frontegg/react-core';
import { MFAStep } from '@frontegg/redux-store/auth';
import { HideOption } from '../../interfaces';
import { MFAVerifyStepMessage } from './MFAVerifyStepMessage';
import { MFAVerifyStepForm } from './MFAVerifyStepForm';
import { MFAVerifyStepErrorMessage } from './MFAVerifyStepErrorMessage';
import { MFAVerifyStepFooter } from './MFAVerifyStepFooter';

import { useMfaActions, useMfaState } from '@frontegg/react-hooks/auth';

const { Formik } = FFormik;

export const MFAVerifyStep: FC<HideOption> = (props) => {
  const { t } = useT();
  const { step } = useMfaState(({ step }) => ({ step }));
  const { verifyMfa } = useMfaActions();

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
