import React from 'react';
import { CheckoutDialog } from '@frontegg/js';
import { DemoButton } from '../../DemoButton';

export const CheckoutDialogButton = () => (
  <DemoButton
    data-test-id='open-checkout-btn'
    onClick={() => {
      CheckoutDialog.show({
        onClose: () => {
          console.log('Closed by user');
        },
        onSuccess: () => {
          console.log('Successful checkout');
        },
        onError: (error: any) => {
          console.log({ error });
        },
        plan: 'awesome-plan',
      });
    }}
  >
    {'Open Checkout Dialog'}
  </DemoButton>
);
