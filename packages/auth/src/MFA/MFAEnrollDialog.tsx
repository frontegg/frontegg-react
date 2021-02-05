import React, { FC, useEffect } from 'react';
import { Dialog, DialogContext, DialogProps, omitProps, useT } from '@frontegg/react-core';
import { MFAStep } from '@frontegg/redux-store/auth';
import { MFAVerifyStep } from './MFAVerifyStep';
import { MFARecoveryCodeStep } from './MFARecoveryCodeStep';
import { useMfaActions } from './hooks';

export type MFADialogProps = DialogProps;
export const MFAEnrollDialog: FC<MFADialogProps> = (props) => {
  const { t } = useT();
  const { setMfaState } = useMfaActions();

  const dialogProps = omitProps(props, ['children']);
  useEffect(() => {
    props.open && setMfaState({ step: MFAStep.verify, loading: true, qrCode: null });
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
