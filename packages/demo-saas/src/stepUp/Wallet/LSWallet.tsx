import React, { useEffect, useState } from 'react';
import { useStepUp, useIsSteppedUp } from '@frontegg/react-hooks';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { StepUpButton } from '../components/Buttons';
import { style, getLocalStorage, addLocalStorage, removeLocalStorage } from './utils';
import CircularWithValueLabel from './Loader';
import { MaxAge } from '../components/MaxAge';

export const WALLET_LOCAL_STORAGE = 'wallet-modal-open';
export const TRANSFER_LOCAL_STORAGE = 'trnasfer';
export const TRANSFER_NAME_LOCAL_STORAGE = 'transfer-name';
export const TRANSFER_REASON_LOCAL_STORAGE = 'transfer-reason';

const MAX_AGE = 35;

export default function LSWalletModal({
  balance,
  setBalance,
}: {
  balance: number;
  setBalance: (balance: number) => void;
}) {
  const [open, setOpen] = useState(getLocalStorage(WALLET_LOCAL_STORAGE) === 'true');
  const [name, setName] = useState(getLocalStorage(TRANSFER_NAME_LOCAL_STORAGE));
  const [reason, setReason] = useState(getLocalStorage(TRANSFER_REASON_LOCAL_STORAGE));
  const [progress, setProgress] = React.useState(100);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    removeLocalStorage(TRANSFER_REASON_LOCAL_STORAGE);
    removeLocalStorage(TRANSFER_NAME_LOCAL_STORAGE);
    setName('');
    setReason('');
  };

  const isSteppedUp = useIsSteppedUp({ maxAge: MAX_AGE });
  const stepUp = useStepUp();

  const isDuringTransfer = getLocalStorage(TRANSFER_LOCAL_STORAGE);

  function transfer() {
    console.log(`Performing bank transfer of 100$ from ${name} - ${reason}`);
    setBalance(balance - 100);
    removeLocalStorage(WALLET_LOCAL_STORAGE);
    removeLocalStorage(TRANSFER_REASON_LOCAL_STORAGE);
    removeLocalStorage(TRANSFER_NAME_LOCAL_STORAGE);
    setProgress(0);
  }

  useEffect(() => {
    if (!isDuringTransfer) return;
    const isDuringTransferDoubleCheck = getLocalStorage(TRANSFER_LOCAL_STORAGE);

    if (!isDuringTransferDoubleCheck) return;

    console.log('removing local storage');
    removeLocalStorage(TRANSFER_LOCAL_STORAGE);

    // when use go back from the step up page without 2 factor - need to remove and don't do operation
    if (!isSteppedUp) return;

    transfer();
  }, [isDuringTransfer]);

  return (
    <div>
      <MaxAge maxAge={MAX_AGE} />

      <StepUpButton onClick={handleOpen}>Local Storage Wallet</StepUpButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {progress !== 100 ? (
            <CircularWithValueLabel progress={progress} setProgress={setProgress} />
          ) : (
            <>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Welcome to your local storage Wallet!
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                You're entitled to the step-up demo!
              </Typography>

              <div>
                Your Amazon balance is <b style={{ color: '#1665c0' }}>{balance}</b>!
              </div>

              <MoneyTransferForm reason={reason} setReason={setReason} name={name} setName={setName} />

              {!isDuringTransfer && (
                <StepUpButton
                  data-test-id='transfer'
                  onClick={() => {
                    // should allow not to pass payload
                    if (isSteppedUp) {
                      transfer();
                      return;
                    }

                    addLocalStorage(WALLET_LOCAL_STORAGE, 'true');
                    addLocalStorage(TRANSFER_LOCAL_STORAGE, 'true');
                    addLocalStorage(TRANSFER_REASON_LOCAL_STORAGE, reason || '');
                    addLocalStorage(TRANSFER_NAME_LOCAL_STORAGE, name || '');

                    stepUp({ maxAge: MAX_AGE });
                  }}
                >
                  Transfer 100$!
                </StepUpButton>
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

const MoneyTransferForm = ({ setName, setReason, reason, name }: any) => {
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleReasonChange = (event: any) => {
    setReason(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
      <TextField label='Name' value={name} onChange={handleNameChange} margin='normal' />
      <TextField label='Reason' value={reason} onChange={handleReasonChange} margin='normal' />
    </Box>
  );
};
