import { createAction } from '@reduxjs/toolkit';
import { IAddUser, IDeleteUser, ILoadUsers, IResendActivationLink, ITeamUser, IUpdateUser } from '@frontegg/rest-api';
import {
  ISetAddUserDialog,
  ISetDeleteUserDialog,
  TeamState,
  TeamStateIndicator,
  LoadRolesAndPermissionsPayload,
} from './interfaces';
import { errorsReducerForKey, loadersReducerForKey, resetStateByKey, typeReducerForKey } from '../utils';
import { ActionDispatchMatcher, WithCallback, WithSilentLoad } from '../../interfaces';
import { authStoreName } from '../../constants';

const teamState: TeamState = {
  loaders: {},
  pageOffset: 0,
  pageSize: 20,
  errors: {},
  users: [],
  roles: [],
  permissions: [],
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

const reducers = {
  setTeamLoader: loadersReducerForKey<TeamStateIndicator>('teamState'),
  setTeamError: errorsReducerForKey<TeamStateIndicator>('teamState'),
  setTeamState: typeReducerForKey<TeamState>('teamState'),
  resetTeamState: resetStateByKey<TeamState>('teamState', { teamState }),
};

const actions = {
  loadUsers: createAction(
    `${authStoreName}/loadUsers`,
    (payload: WithCallback<WithSilentLoad<ILoadUsers>, ITeamUser[]>) => ({ payload })
  ),
  loadRoles: createAction(`${authStoreName}/loadRoles`, (payload: LoadRolesAndPermissionsPayload) => ({ payload })),
  addUser: createAction(`${authStoreName}/addUser`, (payload: WithCallback<IAddUser, ITeamUser>) => ({ payload })),
  updateUser: createAction(`${authStoreName}/updateUser`, (payload: WithCallback<IUpdateUser, ITeamUser>) => ({
    payload,
  })),
  deleteUser: createAction(`${authStoreName}/deleteUser`, (payload: WithCallback<IDeleteUser>) => ({ payload })),
  resendActivationLink: createAction(
    `${authStoreName}/resendActivationLink`,
    (payload: WithCallback<IResendActivationLink>) => ({ payload })
  ),
  openAddUserDialog: createAction(`${authStoreName}/openAddUserDialog`, (payload?: ISetAddUserDialog) => ({ payload })),
  closeAddUserDialog: createAction(`${authStoreName}/closeAddUserDialog`, (payload?: any) => ({ payload })),
  openDeleteUserDialog: createAction(`${authStoreName}/openDeleteUserDialog`, (payload?: ISetDeleteUserDialog) => ({
    payload,
  })),
  closeDeleteUserDialog: createAction(`${authStoreName}/closeDeleteUserDialog`, (payload?: any) => ({ payload })),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setTeamLoader: (payload: TeamStateIndicator) => void;
  setTeamError: (payload: TeamStateIndicator) => void;
  setTeamState: (payload: Partial<TeamState>) => void;
  resetTeamState: () => void;
  loadUsers: (payload: WithCallback<WithSilentLoad<ILoadUsers>, ITeamUser[]>) => void;
  loadRoles: (payload: LoadRolesAndPermissionsPayload) => void;
  addUser: (payload: WithCallback<IAddUser, ITeamUser>) => void;
  updateUser: (payload: WithCallback<IUpdateUser, ITeamUser>) => void;
  deleteUser: (payload: WithCallback<IDeleteUser>) => void;
  resendActivationLink: (payload: WithCallback<IResendActivationLink>) => void;
  openAddUserDialog: (payload?: ISetAddUserDialog) => void;
  closeAddUserDialog: (payload?: any) => void;
  openDeleteUserDialog: (payload?: ISetDeleteUserDialog) => void;
  closeDeleteUserDialog: (payload?: any) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type TeamActions = DispatchedActions;
export { teamState, reducers as teamReducers, actions as teamActions };
