import { createAction } from '@reduxjs/toolkit';
import { IAddUser, ILoadUsers, IResendActivationLink, ISendResetPasswordLink, ITeamUser } from '@frontegg/react-core';
import { TeamState, TeamStateIndicator, TeamStateKeys } from './interfaces';
import { errorsReducerForKey, loadersReducerForKey, resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { WithCallback, WithSilentLoad } from '../interfaces';

export * from './interfaces';

export const teamState: TeamState = {
  loaders: {},
  pageSize: 20,
  errors: {},
  users: [],
  roles: [],
  totalPages: 0,
};

export const teamStateReducers = {
  setTeamLoader: loadersReducerForKey<TeamStateIndicator>('teamState'),
  setTeamError: errorsReducerForKey<TeamStateIndicator>('teamState'),
  setTeamState: typeReducerForKey<TeamState>('teamState'),
  resetTeamState: resetStateByKey<TeamState>('teamState', { teamState }),
};

export const teamActions = {
  loadUsers: createAction(`${storeName}/loadUsers`, (payload: WithSilentLoad<ILoadUsers>) => ({ payload })),

  addUser: createAction(`${storeName}/addUser`, (payload: WithCallback<IAddUser, ITeamUser>) => ({ payload })),

  resendActivationLink: createAction(
    `${storeName}/resendActivationLink`,
    (payload: WithCallback<IResendActivationLink, boolean>) => ({ payload })
  ),
  sendResetPasswordLink: createAction(
    `${storeName}/sendResetPasswordLink`,
    (payload: WithCallback<ISendResetPasswordLink, boolean>) => ({ payload })
  ),
};
