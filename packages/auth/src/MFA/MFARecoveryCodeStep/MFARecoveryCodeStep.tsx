import React, { ComponentType, FC } from 'react';
import { MFAStep } from '@frontegg/redux-store/auth';
import { MFARecoveryCodeStepMessage } from './MFARecoveryCodeStepMessage';
import { MFARecoveryCodeStepForm } from './MFARecoveryCodeStepForm';
import { MFARecoveryCodeStepFooter } from './MFARecoveryCodeStepFooter';

import { useMfaState } from '@frontegg/react-hooks/auth';

type MFARecoveryCodeStepProps = {
  MFARecoveryCodeStepFooter?: ComponentType;
};
export const MFARecoveryCodeStep: FC<MFARecoveryCodeStepProps> = (props) => {
  const { step } = useMfaState(({ step }) => ({ step }));

  const Footer = props.MFARecoveryCodeStepFooter ?? MFARecoveryCodeStepFooter;
  if (step !== MFAStep.recoveryCode) {
    return null;
  }
  const children = props.children ?? (
    <>
      <MFARecoveryCodeStepMessage />
      <MFARecoveryCodeStepForm />
      <Footer />
    </>
  );

  return <div className='fe-mfa__recovery-code-step'>{children}</div>;
};
