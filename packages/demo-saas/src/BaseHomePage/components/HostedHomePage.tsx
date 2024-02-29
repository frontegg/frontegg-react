import React, { FC, useEffect } from 'react';
import {
  useLoginWithRedirect,
  useLoginWithRedirectV2,
  useAuthActions,
  useAuthUserOrNull,
  useIsAuthenticated,
} from '@frontegg/react-hooks';

import Box from '@mui/material/Box';
import { BaseHomePageProps } from '../interfaces';
import { DemoButton } from '../../DemoButton';
import { AdminPortalButton } from './AdminPortalButton';
import { ChildrenRenderer } from './ChildrenRenderer';
import { Links } from './Links';
import { User } from './User';

export const HostedBasedHomePage: FC<BaseHomePageProps> = ({ children, wrapperStyles }) => {
  const user = useAuthUserOrNull();
  const loginWithRedirect = useLoginWithRedirect();
  const loginWithRedirectV2 = useLoginWithRedirectV2();

  const { logout } = useAuthActions();
  const isAuthenticated = useIsAuthenticated();

  // comment it to avoid redirect to login when not authenticated
  useEffect(() => {
    !isAuthenticated && loginWithRedirect();
  }, [isAuthenticated, loginWithRedirect]);

  return (
    <>
      <Box>
        <AdminPortalButton />

        {!isAuthenticated && (
          <>
            <DemoButton
              data-test-id='open-hosted'
              onClick={() => {
                loginWithRedirect();
              }}
            >
              Login
            </DemoButton>

            <DemoButton
              onClick={() => {
                loginWithRedirectV2({
                  shouldRedirectToLogin: true,
                  loginDirectAction: {
                    type: 'social-login',
                    data: 'google',
                  },
                });
              }}
            >
              Direct Login with redirect
            </DemoButton>
          </>
        )}

        {isAuthenticated && (
          <DemoButton data-test-id='logout-hosted' onClick={() => logout()}>
            Logout
          </DemoButton>
        )}
      </Box>

      <User user={user} />
      <div>Hosted</div>

      <Links />

      {isAuthenticated && <ChildrenRenderer wrapperStyles={wrapperStyles}>{children}</ChildrenRenderer>}
    </>
  );
};
