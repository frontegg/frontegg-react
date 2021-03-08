import { AuditsMetadataState } from './interfaces';
import { typeReducerForKey } from '../utils';
import { ActionDispatchMatcher } from '../../interfaces';
import { createAction } from '@reduxjs/toolkit';
import { auditsStoreName } from '../../constants';
import { AuditsState } from '../interfaces';

const auditsMetadataState: AuditsMetadataState = {
  loading: true,
};

const reducers = {
  setAuditsMetadataState: typeReducerForKey<AuditsMetadataState>('auditsMetadataState'),
  resetAuditsMetadataState: (state: AuditsState) => ({ ...state, auditsMetadataState }),
};

const actions = {
  loadAuditsMetadata: createAction(`${auditsStoreName}/loadAuditsMetadata`),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setAuditsMetadataState: (state: Partial<AuditsMetadataState>) => void;
  resetAuditsMetadataState: () => void;
  loadAuditsMetadata: () => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type AuditsMetadataActions = DispatchedActions;
export { auditsMetadataState, reducers as auditsMetadataReducers, actions as auditsMetadataActions };
