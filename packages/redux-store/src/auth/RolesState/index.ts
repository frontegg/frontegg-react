import { createAction } from '@reduxjs/toolkit';
import {
  IAddRole,
  IAttachPermissionsToRole,
  IAttachPermissionToRoles,
  IDeleteRole,
  IRole,
  IRolePermission,
  IUpdateRole,
} from '@frontegg/rest-api';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { ActionDispatchMatcher, WithCallback, WithSilentLoad } from '../../interfaces';
import { authStoreName } from '../../constants';
import { RolesState } from './interfaces';

const rolesState: RolesState = {
  loading: false,
  roles: [],
  permissions: [],
  permissionCategories: [],
};

const reducers = {
  setRolesState: typeReducerForKey<RolesState>('rolesState'),
  resetRolesState: resetStateByKey<RolesState>('rolesState', { rolesState }),
};

const actions = {
  loadRolesAndPermissions: createAction(`${authStoreName}/loadRoles`, (payload?: WithSilentLoad<{}>) => ({ payload })),
  addRole: createAction(`${authStoreName}/addRole`, (payload: WithCallback<IAddRole, IRole>) => ({ payload })),
  updateRole: createAction(`${authStoreName}/updateRole`, (payload: WithCallback<IUpdateRole, IRole>) => ({ payload })),
  deleteRole: createAction(`${authStoreName}/deleteRole`, (payload: WithCallback<IDeleteRole>) => ({ payload })),
  attachPermissionsToRole: createAction(
    `${authStoreName}/attachPermissionsToRole`,
    (payload: WithCallback<IAttachPermissionsToRole, IRole>) => ({ payload })
  ),
  attachPermissionToRoles: createAction(
    `${authStoreName}/attachPermissionToRoles`,
    (payload: WithCallback<IAttachPermissionToRoles, IRolePermission>) => ({ payload })
  ),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setRolesState: (state: RolesState) => void;
  resetRolesState: () => void;
  loadRolesAndPermissions: (payload?: WithSilentLoad<{}>) => void;
  addRole: (payload: WithCallback<IAddRole, IRole>) => void;
  updateRole: (payload: WithCallback<IUpdateRole, IRole>) => void;
  deleteRole: (payload: WithCallback<IDeleteRole>) => void;
  attachPermissionsToRole: (payload: WithCallback<IAttachPermissionsToRole, IRole>) => void;
  attachPermissionToRoles: (payload: WithCallback<IAttachPermissionToRoles, IRolePermission>) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type RolesActions = DispatchedActions;
export { rolesState, reducers as rolesReducers, actions as rolesActions };
