import React, { useEffect, useState } from 'react';
import { useStepUp, useIsSteppedUp } from '@frontegg/react-hooks';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { StepUpButton } from './components/Buttons';
import { getLocalStorage, addLocalStorage, removeLocalStorage, getRandomInt } from './Wallet/utils';
import CircularWithValueLabel from './Wallet/Loader';
import { wrapWithBaseHomePage } from '../BaseHomePage/BaseHomePage';
import { MaxAge } from './components/MaxAge';

export const TRANSFER_ID_LOCAL_STORAGE = 'transfer-id';
export const TRANSFER_NAME_LOCAL_STORAGE = 'transfer-name';
export const TRANSFER_REASON_LOCAL_STORAGE = 'transfer-reason';

const MAX_AGE = 5000;

const HomePage = () => {
  const [balance, setBalance] = useState(2000);
  const [name, setName] = useState(getLocalStorage(TRANSFER_NAME_LOCAL_STORAGE) || '');
  const [reason, setReason] = useState(getLocalStorage(TRANSFER_REASON_LOCAL_STORAGE) || '');
  const [progress, setProgress] = React.useState(100);

  const isSteppedUp = useIsSteppedUp({ maxAge: MAX_AGE });
  const stepUp = useStepUp();

  const isDuringTransfer = !!getLocalStorage(TRANSFER_ID_LOCAL_STORAGE);

  async function transfer(transferID?: string) {
    async function checkID(id: string | null) {
      return new Promise((res) => {
        setTimeout(() => {
          res(!!id);
        }, 1000);
      });
    }

    if (await checkID(transferID || getLocalStorage(TRANSFER_ID_LOCAL_STORAGE))) {
      console.log(`Performing bank transfer of 100$ from ${name} - ${reason}`);
      setBalance(balance - 100);
      setProgress(0);
    } else {
      console.log('Invalid transfer operation');
    }

    removeLocalStorage(TRANSFER_REASON_LOCAL_STORAGE, TRANSFER_NAME_LOCAL_STORAGE, TRANSFER_ID_LOCAL_STORAGE);
  }

  useEffect(() => {
    if (!isDuringTransfer) return;
    const isDuringTransferDoubleCheck = !!getLocalStorage(TRANSFER_ID_LOCAL_STORAGE);

    if (!isDuringTransferDoubleCheck) return;

    // when use go back from the step up page without 2 factor - need to remove and don't do operation
    if (!isSteppedUp) {
      console.log('removing local storage');
      removeLocalStorage(TRANSFER_ID_LOCAL_STORAGE);
    }

    transfer();
  }, [isDuringTransfer]);

  return (
    <>
      {progress !== 100 ? (
        <CircularWithValueLabel progress={progress} setProgress={setProgress} />
      ) : (
        <>
          <MaxAge maxAge={MAX_AGE} />

          <div>
            Your Amazon balance is <b style={{ color: '#1665c0' }}>{balance}</b>!
          </div>

          {isDuringTransfer ? (
            'Transfer in progress'
          ) : (
            <>
              <MoneyTransferForm reason={reason} setReason={setReason} name={name} setName={setName} />

              <StepUpButton
                onClick={() => {
                  if (isSteppedUp) {
                    transfer(getRandomInt(1000, 9999).toString());
                    return;
                  }

                  addLocalStorage(TRANSFER_ID_LOCAL_STORAGE, getRandomInt(1000, 9999).toString());
                  addLocalStorage(TRANSFER_REASON_LOCAL_STORAGE, reason || '');
                  addLocalStorage(TRANSFER_NAME_LOCAL_STORAGE, name || '');

                  stepUp({ maxAge: MAX_AGE });
                }}
              >
                Transfer 100$!
              </StepUpButton>
            </>
          )}
        </>
      )}
    </>
  );
};

const MoneyTransferForm = ({ setName, setReason, reason, name }: any) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <TextField label='Name' value={name} onChange={(event: any) => setName(event.target.value)} margin='normal' />
    <TextField label='Reason' value={reason} onChange={(event: any) => setReason(event.target.value)} margin='normal' />
  </Box>
);

export default wrapWithBaseHomePage(HomePage, { minHeight: '250px', minWidth: '240px' });
