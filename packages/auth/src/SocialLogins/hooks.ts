import { ISocialLoginCallbackState, ISocialLoginsContext } from './types';
import { useAuth } from '../hooks';
import { useContext, useMemo } from 'react';
import { AuthState } from '../Api';
import { ISocialLoginProviderConfiguration, SocialLoginsProviders } from '@frontegg/rest-api';
import { SocialLoginsContext } from './SocialLoginContext';

const stateMapper = ({ socialLoginsState }: AuthState) => socialLoginsState;

export type UrlCreatorConfigType = ISocialLoginProviderConfiguration & { state: string };

export const createSocialLoginState = (state: ISocialLoginCallbackState): string => JSON.stringify(state);

export const useRedirectUri = (): string => {
  const routes = useAuth(({ routes }) => routes);

  const redirectUri = useMemo<string>(() => {
    const url = new URL(window?.location.href);
    const redirectUrl = url.searchParams.get('redirectUrl');
    return `${window.location.origin}${redirectUrl || routes.socialLoginCallbackUrl}`;
  }, [window.location.origin, routes.socialLoginCallbackUrl]);
  return redirectUri;
};

export const useRedirectUrl = (
  urlCreator: (config: UrlCreatorConfigType) => string,
  socialLoginType: SocialLoginsProviders
): string | null => {
  const { action } = useSocialLoginContext();
  const { socialLoginsConfig } = useAuth(stateMapper);
  const config = useMemo(
    () => socialLoginsConfig?.find(({ type }) => type.toLowerCase() === socialLoginType.toLowerCase()),
    [socialLoginsConfig]
  );

  const redirectUri = useRedirectUri();

  const redirectUrl: string | undefined = useMemo(() => {
    if (config) {
      return urlCreator({
        ...config,
        redirectUrl: redirectUri,
        state: createSocialLoginState({ provider: socialLoginType, action }),
      });
    }
  }, [config?.clientId, config?.redirectUrl, action]);

  if (!config?.active || !redirectUrl) {
    return null;
  }

  return redirectUrl;
};

export const useSocialLoginContext = (): ISocialLoginsContext => {
  const context = useContext(SocialLoginsContext);

  if (!context) {
    throw new Error('Social Login compound component cannot be rendered outside SocialLogins component');
  }
  return context;
};
