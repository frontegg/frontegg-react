import React, { FC } from 'react';
import { useAuth } from '../../hooks';
import { MFARecoveryCodeStepMessage } from './MFARecoveryCodeStepMessage';
import { MFARecoveryCodeStepForm } from './MFARecoveryCodeStepForm';
import { MFARecoveryCodeStepFooter } from './MFARecoveryCodeStepFooter';
import { MFAStep } from '../../Api/MfaState';
import { useAuthMfaState } from '../hooks';

export const MFARecoveryCodeStep: FC = (props) => {
  const { step } = useAuthMfaState(({ step }) => ({ step }));

  if (step !== MFAStep.recoveryCode) {
    return null;
  }
  const children = props.children ?? (
    <>
      <MFARecoveryCodeStepMessage />
      <MFARecoveryCodeStepForm />
      <MFARecoveryCodeStepFooter />
    </>
  );

  return <div className='fe-mfa__recovery-code-step'>{children}</div>;
};
