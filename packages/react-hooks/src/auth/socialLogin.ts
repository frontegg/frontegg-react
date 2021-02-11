import {
  SocialLoginActions,
  socialLoginsActions,
  socialLoginsReducer,
  SocialLoginState,
} from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';

export type SocialLoginStateMapper<S extends object> = (state: SocialLoginState) => S;

export const useSocialLoginState: StateHookFunction<SocialLoginState> = <S extends object>(
  stateMapper?: SocialLoginStateMapper<S>
): S => stateHookGenerator(stateMapper, 'socialLoginState');

export const useSocialLoginActions = (): SocialLoginActions =>
  reducerActionsGenerator(socialLoginsActions, socialLoginsReducer);
