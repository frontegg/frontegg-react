import { useContext, useMemo } from 'react';
import { ISocialLoginProviderConfiguration, SocialLoginProviders } from '@frontegg/rest-api';
import { ISocialLoginCallbackState, ISocialLoginsContext } from './types';
import { useAuthRoutes, useSocialLoginState } from '@frontegg/react-hooks/auth';
import { SocialLoginsContext } from './SocialLoginContext';

export type UrlCreatorConfigType = ISocialLoginProviderConfiguration & { state: string };

export const createSocialLoginState = (state: ISocialLoginCallbackState): string => JSON.stringify(state);

export const useRedirectUri = (): string => {
  const routes = useAuthRoutes();
  return useMemo<string>(() => {
    return `${window.location.origin}${routes.socialLoginCallbackUrl}`;
  }, [window.location.origin, routes.socialLoginCallbackUrl]);
};

export const useRedirectUrl = (
  urlCreator: (config: UrlCreatorConfigType) => string,
  socialLoginType: any,
  state?: Partial<ISocialLoginCallbackState>
): string | null => {
  const { action } = useSocialLoginContext();
  const { socialLoginsConfig } = useSocialLoginState();
  const config = useMemo(
    () => socialLoginsConfig?.find(({ type }) => type.toLowerCase() === socialLoginType.toLowerCase()),
    [socialLoginsConfig]
  );

  const redirectUri = useRedirectUri();

  const redirectUrl: string | undefined = useMemo(() => {
    const url = new URL(window?.location.href);
    const afterAuthRedirectUrl = url.searchParams.get('redirectUrl');

    if (config) {
      return urlCreator({
        ...config,
        redirectUrl: redirectUri,
        state: createSocialLoginState({
          provider: socialLoginType,
          action,
          afterAuthRedirectUrl: afterAuthRedirectUrl || undefined,
          ...state,
        }),
      } as any);
    }
  }, [config?.clientId, config?.redirectUrl, action, state]);

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
