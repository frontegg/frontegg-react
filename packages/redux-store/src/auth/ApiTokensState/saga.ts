import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLeading, select, takeEvery, takeLatest, delay, all } from 'redux-saga/effects';
import { api } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { WithCallback, WithSilentLoad } from '../../interfaces';
import { ApiStateKeys, ApiTokenType, ITenantApiTokensData, IUserApiTokensData, IApiTokensData } from './interfaces';
import { apiTokensDataDemo, apiTokensDataTenantDemo, rolesDemo, permissionsDemo } from '../dummy';
import { v4 as uuid } from 'uuid';

function* loadApiTokensData({ payload: apiTokenType }: PayloadAction<ApiTokenType>) {
  yield put(actions.setApiTokensState({ apiTokenType }));
  try {
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.LOAD_API_TOKENS, value: true }));

    if (apiTokenType === 'user') {
      const apiTokensdata = yield call(api.auth.getUserApiTokensData);
      yield put(actions.setApiTokensState({ apiTokensDataUser: apiTokensdata ?? [] }));
    } else {
      const apiTokensData = yield call(api.auth.getTenantApiTokensData);
      const { items: roles } = yield call(api.teams.loadAvailableRoles);
      const { items: permissions } = yield call(api.teams.loadAvailablePermissions);
      yield put(
        actions.setApiTokensState({
          apiTokensDataTenant: apiTokensData ?? [],
          roles: roles ?? [],
          permissions: permissions ?? [],
        })
      );
    }

    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.LOAD_API_TOKENS, value: false }));
  } catch (e) {
    yield put(actions.setApiTokensError({ key: ApiStateKeys.LOAD_API_TOKENS, value: e.message }));
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.LOAD_API_TOKENS, value: false }));
  }
}

function* addUserApiToken({ payload }: PayloadAction<WithCallback<IUserApiTokensData>>) {
  const { description, callback } = payload;
  const { apiTokensDataUser } = yield select((state) => state.auth.apiTokensState);

  try {
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.ADD_API_TOKEN, value: true }));
    const data = yield call(api.auth.updateUserApiTokensData, { description });
    yield put(actions.setApiTokensState({ showAddTokenDialog: false }));
    yield delay(200);
    yield put(
      actions.setApiTokensState({
        apiTokensDataUser: [data, ...apiTokensDataUser],
        successDialog: { open: true, secret: data.secret, clientId: data.clientId },
      })
    );
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.ADD_API_TOKEN, value: false }));
    callback?.(null);
  } catch (e) {
    yield put(actions.setApiTokensError({ key: ApiStateKeys.ADD_API_TOKEN, value: e.message }));
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.ADD_API_TOKEN, value: false }));
    callback?.(null, e.message);
  }
}

function* addTenantApiToken({ payload }: PayloadAction<WithCallback<ITenantApiTokensData>>) {
  const { description, roleIds, callback } = payload;
  const { apiTokensDataTenant } = yield select((state) => state.auth.apiTokensState);

  try {
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.ADD_API_TOKEN, value: true }));
    const data = yield call(api.auth.updateTenantApiTokensData, { description, roleIds });
    yield put(actions.setApiTokensState({ showAddTokenDialog: false }));
    yield delay(200);
    yield put(
      actions.setApiTokensState({
        apiTokensDataTenant: [data, ...apiTokensDataTenant],
        successDialog: { open: true, secret: data.secret, clientId: data.clientId },
      })
    );
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.ADD_API_TOKEN, value: false }));
    callback?.(null);
  } catch (e) {
    yield put(actions.setApiTokensError({ key: ApiStateKeys.ADD_API_TOKEN, value: e.message }));
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.ADD_API_TOKEN, value: false }));
    callback?.(null, e.message);
  }
}

function* deleteUserApiToken({ payload }: PayloadAction<string>) {
  const { apiTokensDataUser } = yield select((state) => state.auth.apiTokensState);

  try {
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.DELETE_API_TOKEN, value: true }));
    yield call(api.auth.deleteUserApiToken, { tokenId: payload });
    yield put(
      actions.setApiTokensState({
        apiTokensDataUser: apiTokensDataUser.filter((i: IApiTokensData) => i.clientId !== payload),
        deleteTokenDialog: { open: false, clientId: payload },
      })
    );
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.DELETE_API_TOKEN, value: false }));
  } catch (e) {
    yield put(actions.setApiTokensError({ key: ApiStateKeys.DELETE_API_TOKEN, value: e.message }));
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.DELETE_API_TOKEN, value: false }));
  }
}

function* deleteTenantApiToken({ payload }: PayloadAction<string>) {
  const { apiTokensDataTenant } = yield select((state) => state.auth.apiTokensState);

  try {
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.DELETE_API_TOKEN, value: true }));
    yield call(api.auth.deleteTenantApiToken, { tokenId: payload });
    yield put(
      actions.setApiTokensState({
        apiTokensDataTenant: apiTokensDataTenant.filter((i: IApiTokensData) => i.clientId !== payload),
        deleteTokenDialog: { open: false, clientId: payload },
      })
    );
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.DELETE_API_TOKEN, value: false }));
  } catch (e) {
    yield put(actions.setApiTokensError({ key: ApiStateKeys.DELETE_API_TOKEN, value: e.message }));
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.DELETE_API_TOKEN, value: false }));
  }
}

function* loadApiTokens({ payload }: PayloadAction<WithSilentLoad<WithCallback>>) {
  if (!payload?.silentLoading) {
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.LOAD_API_TOKENS, value: true }));
  }
  try {
    const [apiTokensDataUser = [], apiTokensDataTenant = []] = yield all([
      call(api.auth.getUserApiTokensData),
      call(api.auth.getTenantApiTokensData),
    ]);
    yield put(
      actions.setApiTokensState({
        apiTokensDataUser,
        apiTokensDataTenant,
      })
    );
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.LOAD_API_TOKENS, value: false }));
    payload?.callback?.(true);
  } catch (e) {
    yield put(actions.setApiTokensError({ key: ApiStateKeys.LOAD_API_TOKENS, value: e.message }));
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.LOAD_API_TOKENS, value: false }));
    payload?.callback?.(null, e);
  }
}

export function* apiTokensSaga() {
  yield takeLeading(actions.loadApiTokens, loadApiTokens);
  yield takeLeading(actions.initApiTokensData, loadApiTokensData);
  yield takeEvery(actions.addUserApiToken, addUserApiToken);
  yield takeEvery(actions.addTenantApiToken, addTenantApiToken);
  yield takeLatest(actions.deleteTenantApiToken, deleteTenantApiToken);
  yield takeLatest(actions.deleteUserApiToken, deleteUserApiToken);
}

/*********************************
 *  Preview Sagas
 *********************************/

function* loadApiTokensDataMock({ payload: apiTokenType }: PayloadAction<ApiTokenType>) {
  yield put(actions.setApiTokensState({ apiTokenType }));
  yield put(actions.setApiTokensLoader({ key: ApiStateKeys.LOAD_API_TOKENS, value: true }));
  if (apiTokenType === 'user') {
    yield delay(200);
    const apiTokensData = [apiTokensDataDemo];
    yield put(actions.setApiTokensState({ apiTokensDataUser: apiTokensData ?? [] }));
  } else {
    yield delay(200);
    yield put(
      actions.setApiTokensState({
        apiTokensDataTenant: [apiTokensDataTenantDemo] ?? [],
        roles: rolesDemo ?? [],
        permissions: permissionsDemo ?? [],
      })
    );
  }

  yield put(actions.setApiTokensLoader({ key: ApiStateKeys.LOAD_API_TOKENS, value: false }));
}

function* addTenantApiTokenMock({ payload }: PayloadAction<WithCallback<ITenantApiTokensData>>) {
  const { description, roleIds, callback } = payload;
  yield put(actions.setApiTokensLoader({ key: ApiStateKeys.ADD_API_TOKEN, value: true }));

  const { apiTokensDataTenant } = yield select((state) => state.auth.apiTokensState);
  const newToken: ITenantApiTokensData = {
    ...apiTokensDataTenantDemo,
    description,
    roleIds,
    clientId: `CLIENT_ID_${uuid()}`,
  };
  yield put(actions.setApiTokensState({ showAddTokenDialog: false }));
  yield delay(200);
  yield put(
    actions.setApiTokensState({
      apiTokensDataTenant: [...apiTokensDataTenant, newToken],
      successDialog: { open: true, secret: newToken.secret, clientId: newToken.clientId },
    })
  );
  yield delay(200);
  yield put(actions.setApiTokensLoader({ key: ApiStateKeys.ADD_API_TOKEN, value: false }));
  callback?.(null);
}

function* deleteTenantApiTokenMock({ payload }: PayloadAction<string>) {
  yield put(actions.setApiTokensLoader({ key: ApiStateKeys.DELETE_API_TOKEN, value: true }));
  yield delay(200);
  const apiTokensDataTenant: ITenantApiTokensData[] = [apiTokensDataTenantDemo];

  yield put(
    actions.setApiTokensState({
      apiTokensDataTenant: apiTokensDataTenant.filter((i: IApiTokensData) => i.clientId !== payload),
      deleteTokenDialog: { open: false, clientId: payload },
    })
  );
  yield put(actions.setApiTokensLoader({ key: ApiStateKeys.DELETE_API_TOKEN, value: false }));
}

function* loadApiTokensMock({ payload }: PayloadAction<WithSilentLoad<WithCallback>>) {
  if (!payload?.silentLoading) {
    yield put(actions.setApiTokensLoader({ key: ApiStateKeys.LOAD_API_TOKENS, value: true }));
  }
  const apiTokensDataUser: IApiTokensData[] = [apiTokensDataDemo];
  const apiTokensDataTenant: ITenantApiTokensData[] = [apiTokensDataTenantDemo];
  yield put(
    actions.setApiTokensState({
      apiTokensDataUser,
      apiTokensDataTenant,
    })
  );
  yield delay(200);
  yield put(actions.setApiTokensLoader({ key: ApiStateKeys.LOAD_API_TOKENS, value: false }));
  payload?.callback?.(true);
}

export function* apiTokensSagaMock() {
  yield takeLeading(actions.loadApiTokens, loadApiTokensMock);
  yield takeLeading(actions.initApiTokensData, loadApiTokensDataMock);
  yield takeEvery(actions.addTenantApiToken, addTenantApiTokenMock);
  yield takeLatest(actions.deleteTenantApiToken, deleteTenantApiTokenMock);
}
