import { useAuth } from '../hooks';
import { Loader } from '@frontegg/react-core';
import React, { createContext, FC, ReactNode, useEffect } from 'react';
import { AuthState } from '../Api';
import { ISocialLoginsContext, SocialLoginsActions } from './types';
import GoogleLogin from './GoogleLogin';
import GithubLogin from './GithubLogin';

export const SocialLoginsContext = createContext<ISocialLoginsContext>({ action: SocialLoginsActions.Login });

export interface SocialLoginsProps {
  action: SocialLoginsActions;
  children: ReactNode;
}

export type SocialLoginsWithCompoundComponents = FC<SocialLoginsProps> & { Google: FC; Github: FC };

const stateMapper = ({ socialLoginsState }: AuthState) => socialLoginsState;

export const SocialLogins: SocialLoginsWithCompoundComponents = (props: SocialLoginsProps) => {
  const { firstLoad, socialLoginsConfig, error } = useAuth(stateMapper);

  if (error) {
    return <div className='fe-error-message'>{error}</div>;
  }

  if (firstLoad) {
    return <Loader />;
  }

  if (!socialLoginsConfig?.length) {
    return null;
  }

  return <SocialLoginsContext.Provider value={{ action: props.action }}>{props.children}</SocialLoginsContext.Provider>;
};

SocialLogins.Google = GoogleLogin;
SocialLogins.Github = GithubLogin;
