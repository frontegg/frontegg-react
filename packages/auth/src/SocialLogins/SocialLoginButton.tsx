import React, { FC, useMemo } from 'react';
import { fronteggElements as FE, useT } from '@frontegg/react-core';
import { SocialLoginsActions } from './types';
import { SocialLoginsProvidersEnum } from '@frontegg/rest-api';

export interface SocialLoginButtonProps {
  name: SocialLoginsProvidersEnum;
  action: SocialLoginsActions;
}

const getButtonText = (action: SocialLoginsActions, name: string): string => {

  switch (action) {
    case 'Login':
      return `auth.social-logins.login.`;
  }
};

export const SocialLoginButton: FC<SocialLoginButtonProps> = (props) => {
  const { t } = useT()
  const {name, children, action} = props

  const providerName: string = name.charAt(0).toUpperCase() + name.slice(1);

  return <FE.Button className={`fe-social-login__button fe-social-login__button__${name.toLowerCase()}`} fullWidth={true}>
    <div className={'fe-row fe-center'}>
      <div>
        {children}
      </div>
      <div>
        {t(`auth.social-logins.${action.toLowerCase()}.button-text`, {providerName})}
      </div>
    </div>
  </FE.Button>;
};
