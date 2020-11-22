import { ISocialLoginCallbackState, ISocialLoginsContext } from './types';
import { useAuth } from '../hooks';
import { useContext, useMemo } from 'react';
import { AuthState } from '../Api';
import { ISocialLoginProviderConfiguration, SocialLoginsProvidersEnum } from '@frontegg/rest-api';
import { SocialLoginsContext } from './SocialLogins';

const stateMapper = ({ socialLoginsState }: AuthState) => socialLoginsState;

export type UrlCreatorConfigType = ISocialLoginProviderConfiguration & {state: string}

export const createSocialLoginState = (state: ISocialLoginCallbackState): string => JSON.stringify(state)

export const useRedirectUrl = (urlCreator: (config: UrlCreatorConfigType) => string, socialLoginType: SocialLoginsProvidersEnum): string | null => {
  const { action } = useSocialLoginContext();
  const { socialLoginsConfig } = useAuth(stateMapper);
  const config = useMemo(() => socialLoginsConfig?.find(({ type }) => type.toLowerCase() === socialLoginType.toLowerCase()), [socialLoginsConfig]);

  const redirectUrl: string | undefined = useMemo(() => {
      if (config) {
        return urlCreator({
          ...config,
          state: createSocialLoginState({ provider: socialLoginType, action }),
        });
      }
    }, [config?.clientId, config?.redirectUrl, action]);

  if(!config?.active || !redirectUrl) {
    return null
  }

  return redirectUrl
}

export const useSocialLoginContext = (): ISocialLoginsContext => {
  const context = useContext(SocialLoginsContext);

  if (!context) {
    throw new Error('Social Login compound component cannot be rendered outside SocialLogins component');
  }
  return context;
};
