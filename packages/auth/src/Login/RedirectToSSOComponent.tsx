import React from 'react';
import { Loader } from 'semantic-ui-react';

export interface RedirectToSSOComponentProps {
  ssoAddress?: string
}

export const RedirectToSSOComponent = ({ ssoAddress }: RedirectToSSOComponentProps) => {
  return <div className='fe-login-sso-redirect'>
    Being redirected to your SSO provider...
    <Loader active={true} inline={true}/>
  </div>;
};
