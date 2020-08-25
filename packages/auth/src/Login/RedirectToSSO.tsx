import React from 'react';
import { Loader } from 'semantic-ui-react';

export const RedirectToSSO = () => {
  return <div className='fe-login-sso-redirect'>
    Being redirected to your SSO provider...
    <Loader active={true} inline={true}/>
  </div>;
};
