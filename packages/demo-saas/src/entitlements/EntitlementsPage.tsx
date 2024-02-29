import React from 'react';
import Box from '@mui/material/Box';
import { useAuthActions, useIsAuthenticated } from '@frontegg/react-hooks';
import { wrapWithBaseHomePage } from '../BaseHomePage/BaseHomePage';
import { EntitlementBoxes } from './components/EntitlementBoxes';
import { DemoButton } from '../DemoButton';

const Page = () => {
  const isAuthenticated = useIsAuthenticated();

  const { loadEntitlements } = useAuthActions();

  const onLoadEntitlements = () => {
    loadEntitlements({
      callback: (isSucceeded: boolean) =>
        console.log(`Load entitlements with a callback ${isSucceeded ? 'succeeded' : 'failed'}`),
    });
  };

  return isAuthenticated ? (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <EntitlementBoxes />

      <Box display='flex'>
        <DemoButton onClick={() => loadEntitlements()}>Load entitlements</DemoButton>
        <DemoButton onClick={onLoadEntitlements}>Load entitlements with a callback</DemoButton>
      </Box>
    </Box>
  ) : (
    <>Not authenticated</>
  );
};

export default wrapWithBaseHomePage(Page);
