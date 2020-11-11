import { ProfileState } from './interfaces';
import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { createAction } from '@reduxjs/toolkit';
import { IChangePassword, IUserProfile } from '@frontegg/rest-api';
import { WithCallback } from '../interfaces';

export * from './interfaces';

export const profileState: ProfileState = {
  loading: false,
  error: null,
};

export const profileStateReducers = {
  setProfileState: typeReducerForKey<ProfileState>('profileState'),
  resetProfileState: resetStateByKey<ProfileState>('profileState', { profileState }),
};

export const profileActions = {
  loadProfile: createAction(`${storeName}/loadProfile`),
  saveProfile: createAction(
    `${storeName}/saveProfile`,
    (payload: Partial<WithCallback<IUserProfile, IUserProfile>>) => ({ payload })
  ),
  changePassword: createAction(`${storeName}/changePassword`, (payload: IChangePassword) => ({ payload })),
};
