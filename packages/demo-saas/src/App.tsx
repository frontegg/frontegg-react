import React, { FC, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FronteggProvider } from '@frontegg/react';
import { FronteggAppOptions } from '@frontegg/types';
import { authOptions } from './customizationOptions/authOptions';
import HomePage from './HomePage';
import CMCPage from './cmc/CMCPage';
import CMCSsoPage from './cmc/CMCSsoPage';
import CMCScimPage from './cmc/CMCScimPage';
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
import { ROUTE_PATHS } from './BaseHomePage/components/Links';

const IS_HOSTED_LOGIN = true;

const fronteggOptions: FronteggAppOptions =
  // @ts-ignore
  window.CYPRESS_CONFIG ||
  ({
    contextOptions: {
      // baseUrl: process.env.PUBLIC_URL || process.env.REACT_APP_BASE_URL || DEFAULT_BASE_URL,
      // clientId: process.env.REACT_APP_CLIENT_ID,
      baseUrl: 'https://uin4mfouvdqh31viy4svah.stg.frontegg.com',
      clientId: '3137663b-db5e-45dd-aaec-9814012d286d',
    },
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
      >
        <Switch>
          <Route path={ROUTE_PATHS.HOME_PAGE} exact render={HomePage} />
          <Route path={ROUTE_PATHS.ENTITLEMENTS} exact render={EntitlementsPage} />
          <Route path={ROUTE_PATHS.STEP_UP_HIGH_MAX_AGE} exact render={SimpleStepUpButtonPage} />
          <Route path={ROUTE_PATHS.STEP_UP_SMALL_MAX_AGE} exact render={SmallMaxAgeStepUpPage} />
          <Route path={ROUTE_PATHS.STEP_UP_NO_MAX_AGE} exact render={NoMaxAgeStepUpPage} />
          <Route path={ROUTE_PATHS.STEP_UP_MODALS} exact render={ModalsStepUpPage} />
          <Route path={ROUTE_PATHS.STEP_UP_HOC} exact render={HOCStepUpPage} />
          <Route path={ROUTE_PATHS.STEP_UP_TRANSFER} exact render={TransferStepUpPage} />
          <Route path={ROUTE_PATHS.CMC} exact render={CMCPage} />
          <Route path={ROUTE_PATHS.CMC_SSO} exact render={CMCSsoPage} />
          <Route path={ROUTE_PATHS.CMC_SCIM} exact render={CMCScimPage} />
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
