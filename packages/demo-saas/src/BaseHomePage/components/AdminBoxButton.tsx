import React from 'react';
import { AdminPortal } from '@frontegg/js';
import { DemoButton } from '../../DemoButton';

export const AdminBoxButton = () => (
  <DemoButton
    data-test-id='open-admin-portal-btn'
    onClick={() => {
      AdminPortal.show();
    }}
  >
    {'Open AdminBox'}
  </DemoButton>
);
