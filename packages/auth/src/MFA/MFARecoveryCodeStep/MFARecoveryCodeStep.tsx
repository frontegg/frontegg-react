import React, { FC } from 'react';
import { useAuth } from '../../hooks';
import { MFAStep } from '../../Api';
import { MFARecoveryCodeStepMessage } from './MFARecoveryCodeStepMessage';
import { MFARecoveryCodeStepForm } from './MFARecoveryCodeStepForm';
import { MFARecoveryCodeStepFooter } from './MFARecoveryCodeStepFooter';

export const MFARecoveryCodeStep: FC = (props) => {
  const { step, recoveryCode } = useAuth((state) => state.mfaState);

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
