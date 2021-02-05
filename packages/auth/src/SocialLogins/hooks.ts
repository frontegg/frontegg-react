import { useContext, useMemo } from 'react';
import { ISocialLoginProviderConfiguration, SocialLoginsProviders } from '@frontegg/rest-api';
import {
  SocialLoginActions,
  socialLoginsActions,
  socialLoginsReducer,
  SocialLoginState,
} from '@frontegg/redux-store/auth';
import { ISocialLoginCallbackState, ISocialLoginsContext } from './types';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from '../hooks';
import { SocialLoginsContext } from './SocialLoginContext';

export type SocialLoginStateMapper<S extends object> = (state: SocialLoginState) => S;

export const useSocialLoginState: StateHookFunction<SocialLoginState> = <S extends object>(
  stateMapper?: SocialLoginStateMapper<S>
): S => stateHookGenerator(stateMapper, 'socialLoginState');

export const useSocialLoginActions = (): SocialLoginActions =>
  reducerActionsGenerator(socialLoginsActions, socialLoginsReducer);

export type UrlCreatorConfigType = ISocialLoginProviderConfiguration & { state: string };

export const useRedirectUrl = (
  urlCreator: (config: UrlCreatorConfigType) => string,
  socialLoginType: SocialLoginsProviders
): string | null => {
  const { action } = useSocialLoginContext();
  const { socialLoginsConfig } = useSocialLoginState();
  const config = useMemo(
    () => socialLoginsConfig?.find(({ type }) => type.toLowerCase() === socialLoginType.toLowerCase()),
    [socialLoginsConfig]
  );

  const redirectUrl: string | undefined = useMemo(() => {
    if (config) {
      return urlCreator({
        ...config,
        state: JSON.stringify({ provider: socialLoginType, action } as ISocialLoginCallbackState),
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
