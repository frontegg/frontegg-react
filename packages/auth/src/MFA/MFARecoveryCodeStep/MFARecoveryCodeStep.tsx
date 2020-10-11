import React, { FC } from 'react';
import { useAuth } from '../../hooks';
import { MFARecoveryCodeStepMessage } from './MFARecoveryCodeStepMessage';
import { MFARecoveryCodeStepForm } from './MFARecoveryCodeStepForm';
import { MFARecoveryCodeStepFooter } from './MFARecoveryCodeStepFooter';
import { MFAStep } from '../../Api/MfaState';

export const MFARecoveryCodeStep: FC = (props) => {
  const { step } = useAuth((state) => state.mfaState);

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
