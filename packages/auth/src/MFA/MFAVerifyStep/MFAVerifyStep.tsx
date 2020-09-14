import React, { FC } from 'react';
import { FFormik, Form, useT, validateSchema, validateTwoFactorCode } from '@frontegg/react-core';
import { MFAStep } from '../../Api';
import { useAuth } from '../../hooks';
import { HideOption } from '../../interfaces';
import { MFAVerifyStepMessage } from './MFAVerifyStepMessage';
import { MFAVerifyStepForm } from './MFAVerifyStepForm';
import { MFAVerifyStepErrorMessage } from './MFAVerifyStepErrorMessage';
import { MFAVerifyStepFooter } from './MFAVerifyStepFooter';

const { Formik } = FFormik;

export const MFAVerifyStep: FC<HideOption> = (props) => {
  const { t } = useT();
  const { step, verifyMfa } = useAuth((state) => state.mfaState);

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
        <Form>{children}</Form>
      </Formik>
    </div>
  );
};
