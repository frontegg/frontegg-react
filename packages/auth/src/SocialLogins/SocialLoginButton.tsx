import React, { FC } from 'react';
import { fronteggElements as FE, useT } from '@frontegg/react-core';
import { SocialLoginsActions } from './types';
import { SocialLoginsProviders } from '@frontegg/rest-api';

export interface SocialLoginButtonProps {
  name: SocialLoginsProviders;
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
