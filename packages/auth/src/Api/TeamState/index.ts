import { createAction } from '@reduxjs/toolkit';
import { IAddUser, IDeleteUser, ILoadUsers, IResendActivationLink, ITeamUser, IUpdateUser } from '@frontegg/rest-api';
import { ISetAddUserDialog, ISetDeleteUserDialog, TeamState, TeamStateIndicator } from './interfaces';
import { errorsReducerForKey, loadersReducerForKey, resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { WithCallback, WithSilentLoad } from '../interfaces';

export * from './interfaces';

export const teamState: TeamState = {
  loaders: {},
  pageOffset: 0,
  pageSize: 20,
  errors: {},
  users: [],
  roles: [],
  totalPages: 0,
  filter: [],
  sort: [],

  addUserDialogState: {
    loading: false,
    open: false,
  },
  deleteUserDialogState: {
    loading: false,
    open: false,
  },
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
  updateUser: createAction(`${storeName}/updateUser`, (payload: IUpdateUser) => ({ payload })),
  deleteUser: createAction(`${storeName}/deleteUser`, (payload: IDeleteUser) => ({ payload })),

  resendActivationLink: createAction(
    `${storeName}/resendActivationLink`,
    (payload: WithCallback<IResendActivationLink, boolean>) => ({ payload })
  ),
  openAddUserDialog: createAction(`${storeName}/openAddUserDialog`, (payload?: ISetAddUserDialog) => ({ payload })),
  closeAddUserDialog: createAction(`${storeName}/closeAddUserDialog`, (data?: any) => ({ payload: data })),
  openDeleteUserDialog: createAction(`${storeName}/openDeleteUserDialog`, (payload?: ISetDeleteUserDialog) => ({
    payload,
  })),
  closeDeleteUserDialog: createAction(`${storeName}/closeDeleteUserDialog`, (data?: any) => ({ payload: data })),
};
