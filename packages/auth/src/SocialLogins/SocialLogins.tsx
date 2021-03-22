import React, { FC, ReactNode, useEffect } from 'react';
import { Loader } from '@frontegg/react-core';
import { useAuth } from '../hooks';
import { AuthState } from '../Api';
import { SocialLoginsActions } from './types';
import GoogleLogin from './GoogleLogin';
import GithubLogin from './GithubLogin';
import MicrosoftLogin from './MicrosoftLogin';
import { SocialLoginsContext } from './SocialLoginContext';

export interface SocialLoginsProps {
  action: SocialLoginsActions;
  children?: ReactNode;
}

export type SocialLoginsWithCompoundComponents = FC<SocialLoginsProps> & { Google: FC; Github: FC; Microsoft: FC };

const stateMapper = ({ socialLoginsState }: AuthState) => socialLoginsState;

export const SocialLogins: SocialLoginsWithCompoundComponents = (props: SocialLoginsProps) => {
  const { firstLoad, socialLoginsConfig, error, loadSocialLoginsConfiguration } = useAuth(stateMapper);

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
SocialLogins.Microsoft = MicrosoftLogin;
