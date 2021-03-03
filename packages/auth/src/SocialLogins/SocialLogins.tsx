import React, { FC, ReactNode, useEffect } from 'react';
import { Loader } from '@frontegg/react-core';
import { SocialLoginsActions } from './types';
import GoogleLogin from './GoogleLogin';
import GithubLogin from './GithubLogin';
import { SocialLoginsContext } from './SocialLoginContext';
import { useSocialLoginActions, useSocialLoginState } from '@frontegg/react-hooks/auth';

export interface SocialLoginsProps {
  action: SocialLoginsActions;
  children?: ReactNode;
}

export type SocialLoginsWithCompoundComponents = FC<SocialLoginsProps> & { Google: FC; Github: FC };

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

  return <SocialLoginsContext.Provider value={{ action: props.action }}>{props.children}</SocialLoginsContext.Provider>;
};

SocialLogins.Google = GoogleLogin;
SocialLogins.Github = GithubLogin;
