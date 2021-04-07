import React, { FC } from 'react';
import { fronteggElements as FE, useT } from '@frontegg/react-core';
import { SocialLoginProviders } from '@frontegg/rest-api';
import { SocialLoginsActions } from './types';

export interface SocialLoginButtonProps {
  name: SocialLoginProviders;
  action: SocialLoginsActions;
}

export const SocialLoginButton: FC<SocialLoginButtonProps> = (props) => {
  const { t } = useT();
  const { name, children, action } = props;

  const providerName: string = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <FE.Button
      className={`fe-social-login__button fe-social-login__button__${name.toLowerCase()}`}
      data-test-id={`${name.toLowerCase()}SocialLogin-btn`}
      fullWidth={true}
    >
      <div className={'fe-row fe-center'}>
        <div>{children}</div>
        <div>{t(`auth.social-logins.${action.toLowerCase()}.button-text`, { providerName })}</div>
      </div>
    </FE.Button>
  );
};
