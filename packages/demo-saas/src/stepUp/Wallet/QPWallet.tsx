import React, { useEffect, useState } from 'react';
import { useStepUp, useIsSteppedUp } from '@frontegg/react-hooks';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { StepUpButton } from '../components/Buttons';
import { style, getQueryParam, addQueryParam, removeQueryParam } from './utils';
import MyBalance from './MyBalance';
import { MaxAge } from '../components/MaxAge';

export const WALLET_QUERY_PARAM = 'wallet-modal-open';
const MAX_AGE = 5000;

export default function QPWalletModal() {
  const isSteppedUp = useIsSteppedUp({ maxAge: MAX_AGE });
  const stepUp = useStepUp();

  const [open, setOpen] = useState(getQueryParam(WALLET_QUERY_PARAM) === 'true');

  useEffect(() => {
    isSteppedUp && removeQueryParam(WALLET_QUERY_PARAM);
  }, [isSteppedUp]);

  return (
    <div>
      <MaxAge maxAge={MAX_AGE} />

      <StepUpButton onClick={() => setOpen(true)}>Query Params Wallet</StepUpButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Welcome to your query-param Wallet!
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            You're entitled to the step-up demo!
          </Typography>

          {isSteppedUp ? (
            <MyBalance />
          ) : (
            <StepUpButton
              data-test-id='step-up'
              onClick={() => {
                addQueryParam(WALLET_QUERY_PARAM, 'true');

                // should allow not to pass payload
                stepUp({ maxAge: MAX_AGE });
              }}
            >
              Show my balance
            </StepUpButton>
          )}
        </Box>
      </Modal>
    </div>
  );
}
