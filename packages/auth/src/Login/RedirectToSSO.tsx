import { useT } from '@frontegg/react-core';
import React from 'react';
import { Loader } from 'semantic-ui-react';

export const RedirectToSSO = () => {
  const { t } = useT();
  return <div className='fe-login-sso-redirect'>
    {t('auth.login.redirect-to-sso-message')}
    <Loader active={true} inline={true}/>
  </div>;
};
