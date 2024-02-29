import React, { FC } from 'react';
import { useAuthUser, useAuthActions, useIsAuthenticated } from '@frontegg/react-hooks';

import Box from '@mui/material/Box';
import { BaseHomePageProps } from '../interfaces';
import { DemoButton } from '../../DemoButton';
import { AdminBoxButton } from './AdminBoxButton';
import { CheckoutDialogButton } from './CheckoutDialogButton';
import { ChildrenRenderer } from './ChildrenRenderer';
import { Links } from './Links';
import { User } from './User';

export const EmbeddedBasedHomePage: FC<BaseHomePageProps> = ({ children, wrapperStyles }) => {
  const user = useAuthUser();

  const { logout } = useAuthActions();
  const isAuthenticated = useIsAuthenticated();

  return (
    <Box display='flex' flexDirection='column' alignItems='center' mt={2} lineHeight='2em'>
      <Box>
        <AdminBoxButton />
        <CheckoutDialogButton />

        <DemoButton data-test-id='logout-embedded' onClick={() => logout()}>
          Logout
        </DemoButton>
      </Box>

      <User user={user} />
      <div>Embedded</div>

      <Links />

      {isAuthenticated && <ChildrenRenderer wrapperStyles={wrapperStyles}>{children}</ChildrenRenderer>}
    </Box>
  );
};
