import React, { FC, useEffect } from 'react';
import { Dialog, DialogContext, DialogProps, omitProps, useT } from '@frontegg/react-core';
import { MFAVerifyStep } from './MFAVerifyStep';
import { MFARecoveryCodeStep } from './MFARecoveryCodeStep';
import { useAuth } from '../hooks';
import { MFAStep } from '../Api';

export type MFADialogProps = DialogProps;
export const MFAEnrollDialog: FC<MFADialogProps> = (props) => {
  const { t } = useT();
  const { resetMfaState, setMfaState } = useAuth();
  const dialogProps = omitProps(props, ['children']);
  // useEffect(() => {props.open && resetMfaState();}, [props.open]);
  useEffect(() => {
    setMfaState({
      step: MFAStep.recoveryCode,
      recoveryCode: '12311231',
    });
  }, [props.open]);

  const children = props.children ?? (
    <>
      <MFAVerifyStep />
      <MFARecoveryCodeStep />
    </>
  );
  return (
    <DialogContext.Provider value={{ onClose: props.onClose }}>
      <Dialog
        size='tiny'
        className='fe-mfa-dialog'
        header={t('auth.mfa.title')}
        closeOnEscape
        closeOnDimmerClick
        {...dialogProps}
      >
        {children}
      </Dialog>
    </DialogContext.Provider>
  );
};
