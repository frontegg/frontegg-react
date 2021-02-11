import { createAction } from '@reduxjs/toolkit';
import { IChangePassword } from '@frontegg/rest-api';
import { ProfileState, SaveProfilePayload } from './interfaces';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { authStoreName } from '../../constants';
import { ActionDispatchMatcher, WithCallback } from '../../interfaces';

const profileState: ProfileState = {
  loading: false,
  error: null,
};

const reducers = {
  setProfileState: typeReducerForKey<ProfileState>('profileState'),
  resetProfileState: resetStateByKey<ProfileState>('profileState', { profileState }),
};

const actions = {
  loadProfile: createAction(`${authStoreName}/loadProfile`),
  saveProfile: createAction(`${authStoreName}/saveProfile`, (payload: SaveProfilePayload) => ({ payload })),
  changePassword: createAction(`${authStoreName}/changePassword`, (payload: WithCallback<IChangePassword>) => ({
    payload,
  })),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setProfileState: (state: Partial<ProfileState>) => void;
  resetProfileState: () => void;
  loadProfile: () => void;
  saveProfile: (payload: SaveProfilePayload) => void;
  changePassword: (payload: WithCallback<IChangePassword>) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type ProfileActions = DispatchedActions;
export { profileState, reducers as profileReducers, actions as profileActions };
