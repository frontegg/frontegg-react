import React, { FC, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FronteggProvider } from './FronteggProvider';
import { FronteggAppOptions } from '@frontegg/types';
import { authOptions } from './customizationOptions/authOptions';
import HomePage from './HomePage';
import ModalsStepUpPage from './stepUp/ModalsStepUpPage';
import HOCStepUpPage from './stepUp/HOCStepUpPage';
import SimpleStepUpButtonPage from './stepUp/SimpleStepUpButtonPage';
import SmallMaxAgeStepUpPage from './stepUp/SmallMaxAgeStepUpPage';
import TransferStepUpPage from './stepUp/TransferStepUpPage';
import NoMaxAgeStepUpPage from './stepUp/NoMaxAgeStepUpPage';
import EntitlementsPage from './entitlements/EntitlementsPage';
import Fallback from './Fallback';
import NotAFronteggPage from './NotAFronteggPage';
import { DEFAULT_BASE_URL } from './consts';

const IS_HOSTED_LOGIN = true;

const fronteggOptions: FronteggAppOptions =
  // @ts-ignore
  window.CYPRESS_CONFIG ||
  ({
    contextOptions: {
      baseUrl: process.env.PUBLIC_URL || process.env.REACT_APP_BASE_URL || DEFAULT_BASE_URL,
      clientId: process.env.REACT_APP_CLIENT_ID,
    },

    // guidesCdnUrl: 'https://assets.frontegg.com/admin-box/embedded-guides/1.0.0',
    ...authOptions,
    enableOpenAppRoute: true,
  } as FronteggAppOptions);

export const App: FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <FronteggProvider
        {...fronteggOptions}
        customLoader={setLoading}
        entitlementsOptions={{ enabled: true }}
        hostedLoginBox={IS_HOSTED_LOGIN} // don't remove it! change the flag above
        overrideFeatureFlags={{
          'sso-guides': 'on',
        }}
      >
        <Switch>
          <Route path={'/'} exact render={HomePage} />
          <Route path={'/entitlements'} exact render={EntitlementsPage} />
          <Route path={'/step-up-high-max-age'} exact render={SimpleStepUpButtonPage} />
          <Route path={'/step-up-small-max-age'} exact render={SmallMaxAgeStepUpPage} />
          <Route path={'/step-up-no-max-age'} exact render={NoMaxAgeStepUpPage} />
          <Route path={'/step-up-modals'} exact render={ModalsStepUpPage} />
          <Route path={'/step-up-hoc'} exact render={HOCStepUpPage} />
          <Route path={'/step-up-transfer'} exact render={TransferStepUpPage} />
          {/* For tests that use someurl as the authenticated-url */}
          <Route path={'/someurl'} exact render={NotAFronteggPage} />
          <Route
            path={'/test'}
            exact
            component={() => {
              return <div>Test</div>;
            }}
          />
          <Route path={'*'} render={Fallback} />
        </Switch>
      </FronteggProvider>

      {loading && !IS_HOSTED_LOGIN && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            alignItems: 'center',
          }}
        >
          <Loader />
        </Box>
      )}
    </BrowserRouter>
  );
};
