import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';
import {
  auditsMetadataActions,
  AuditsMetadataActions,
  auditsMetadataReducers,
  AuditsMetadataState,
} from '@frontegg/redux-store/audits';

export type AuditsMetadataStateMapper<S extends object> = (state: AuditsMetadataState) => S;

export const useAuditsMetadataState: StateHookFunction<AuditsMetadataState> = <S extends object>(
  stateMapper?: AuditsMetadataStateMapper<S>
): S => stateHookGenerator(stateMapper, 'auditsMetadataState');

export const useAuditsMetadataActions = (): AuditsMetadataActions =>
  reducerActionsGenerator(auditsMetadataActions, auditsMetadataReducers);
