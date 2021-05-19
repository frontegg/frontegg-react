import React, { FC, ReactNode, useEffect } from 'react';
import { Loader } from '@frontegg/react-core';
import { ISocialLoginCallbackState, SocialLoginsActions } from './types';
import GoogleLogin from './GoogleLogin';
import GithubLogin from './GithubLogin';
import MicrosoftLogin from './MicrosoftLogin';
import { SocialLoginsContext } from './SocialLoginContext';
import FacebookLogin from './FacebookLogin';
import { useSocialLoginActions, useSocialLoginState } from '@frontegg/react-hooks/auth';

export interface SocialLoginsProps {
  action: SocialLoginsActions;
  disabled?: boolean;
  children?: ReactNode;
  state?: Partial<ISocialLoginCallbackState>;
}

export type SocialLoginsWithCompoundComponents = FC<SocialLoginsProps> & {
  Google: FC;
  Github: FC;
  Microsoft: FC;
  Facebook: FC;
};

export const SocialLogins: SocialLoginsWithCompoundComponents = (props: SocialLoginsProps) => {
  const { firstLoad, socialLoginsConfig, error } = useSocialLoginState();
  const { loadSocialLoginsConfiguration } = useSocialLoginActions();

  useEffect(() => {
    if (firstLoad) {
      loadSocialLoginsConfiguration();
    }
  }, [firstLoad]);

  if (error) {
    return <div className='fe-error-message'>{error}</div>;
  }

  if (firstLoad) {
    return <Loader />;
  }

  if (!socialLoginsConfig?.length || !socialLoginsConfig.some(({ active }) => active)) {
    return null;
  }

  return (
    <SocialLoginsContext.Provider
      value={{ action: props.action, disabled: props.disabled ?? false, state: props.state }}
    >
      {props.children}
    </SocialLoginsContext.Provider>
  );
};

SocialLogins.Google = GoogleLogin;
SocialLogins.Github = GithubLogin;
SocialLogins.Microsoft = MicrosoftLogin;
SocialLogins.Facebook = FacebookLogin;
