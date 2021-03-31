import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import {
  api,
  IAddRole,
  IAttachPermissionsToRole,
  IAttachPermissionToRoles,
  IDeleteRole,
  IRole,
  IRolePermission,
  IUpdateRole,
} from '@frontegg/rest-api';
import { actions } from '../reducer';
import { WithCallback, WithSilentLoad } from '../../interfaces';

function* loadRolesAndPermissions({ payload }: PayloadAction<WithSilentLoad<{}>>) {
  yield put(actions.setRolesState({ loading: !(payload?.silentLoading ?? false), error: null }));
  try {
    const result = yield all([
      call(api.roles.getRoles),
      call(api.roles.getPermissions),
      call(api.roles.getPermissionCategories),
    ]);
    const [roles, permissions, permissionCategories] = result;
    yield put(actions.setRolesState({ roles, permissions, permissionCategories, loading: false }));
  } catch (e) {
    yield put(actions.setRolesState({ error: e.message, loading: false }));
  }
}

function* addRole({ payload: { callback, ...body } }: PayloadAction<WithCallback<IAddRole, IRole>>) {
  yield put(actions.setRolesState({ saving: true }));
  try {
    const role = yield call(api.roles.addRole, body);
    const roles = yield call(api.roles.getRoles);
    yield put(actions.loadRolesAndPermissions({ silentLoading: true }));
    yield put(actions.setRolesState({ roles, saving: false }));
    callback?.(role);
  } catch (e) {
    yield put(actions.setRolesState({ error: e.message, saving: false }));
    callback?.(null, e);
  }
}

function* deleteRole({ payload: { callback, ...body } }: PayloadAction<WithCallback<IDeleteRole>>) {
  yield put(actions.setRolesState({ saving: true }));
  try {
    yield call(api.roles.deleteRole, body);
    yield put(actions.loadRolesAndPermissions({ silentLoading: true }));
    yield put(actions.setRolesState({ saving: false }));
    callback?.(true);
  } catch (e) {
    yield put(actions.setRolesState({ error: e.message, saving: false }));
    callback?.(false, e);
  }
}

function* updateRole({ payload: { callback, ...body } }: PayloadAction<WithCallback<IUpdateRole, IRole>>) {
  yield put(actions.setRolesState({ saving: true }));
  try {
    const role = yield call(api.roles.updateRole, body);
    yield put(actions.loadRolesAndPermissions({ silentLoading: true }));
    yield put(actions.setRolesState({ saving: false }));
    callback?.(role);
  } catch (e) {
    yield put(actions.setRolesState({ error: e.message, saving: false }));
    callback?.(null, e);
  }
}

function* attachPermissionsToRole({
  payload: { callback, ...body },
}: PayloadAction<WithCallback<IAttachPermissionsToRole, IRole>>) {
  yield put(actions.setRolesState({ saving: true }));
  try {
    const role = yield call(api.roles.attachPermissionsToRole, body);
    yield put(actions.loadRolesAndPermissions({ silentLoading: true }));
    yield put(actions.setRolesState({ saving: false }));
    callback?.(role);
  } catch (e) {
    yield put(actions.setRolesState({ error: e.message, saving: false }));
    callback?.(null, e);
  }
}

function* attachPermissionToRoles({
  payload: { callback, ...body },
}: PayloadAction<WithCallback<IAttachPermissionToRoles, IRolePermission>>) {
  yield put(actions.setRolesState({ saving: true }));
  try {
    const permission = yield call(api.roles.attachPermissionToRoles, body);
    yield put(actions.loadRolesAndPermissions({ silentLoading: true }));
    yield put(actions.setRolesState({ saving: false }));
    callback?.(permission);
  } catch (e) {
    yield put(actions.setRolesState({ error: e.message, saving: false }));
    callback?.(null, e);
  }
}

export function* rolesSagas() {
  yield takeLeading(actions.loadRolesAndPermissions, loadRolesAndPermissions);
  yield takeEvery(actions.addRole, addRole);
  yield takeEvery(actions.deleteRole, deleteRole);
  yield takeEvery(actions.updateRole, updateRole);
  yield takeEvery(actions.attachPermissionsToRole, attachPermissionsToRole);
  yield takeEvery(actions.attachPermissionToRoles, attachPermissionToRoles);
}
