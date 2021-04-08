import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, putResolve, takeEvery } from 'redux-saga/effects';
import { api, ISwitchTenant, ITenantsResponse } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { WithCallback } from '../../interfaces';
import { delay } from '../utils';
import { tenantsDemo } from '../dummy';

function* switchTenant({ payload: { tenantId, callback } }: PayloadAction<WithCallback<ISwitchTenant>>) {
  yield put(actions.setState({ isLoading: true }));
  try {
    yield call(api.tenants.switchTenant, { tenantId });
    yield putResolve(actions.requestAuthorize(true));
    callback?.(true);
  } catch (e) {
    callback?.(false, e);
    yield put(actions.setState({ isLoading: false }));
  }
}

function* loadTenants({ payload }: PayloadAction<WithCallback<{}, ITenantsResponse[]>>) {
  yield put(actions.setTenantsState({ loading: true }));
  try {
    const tenants = yield call(api.tenants.getTenants);
    yield put(actions.setTenantsState({ tenants, loading: false }));
    payload?.callback?.([]);
  } catch (e) {
    payload?.callback?.([], e);
    yield put(actions.setTenantsState({ loading: false }));
  }
}

export function* tenantsSagas() {
  yield takeEvery(actions.loadTenants, loadTenants);
  yield takeEvery(actions.switchTenant, switchTenant);
}

/*********************************
 *  Preview Sagas
 *********************************/

function* loadTenantsMock({ payload }: PayloadAction<WithCallback<{}, ITenantsResponse[]>>) {
  yield put(actions.setTenantsState({ loading: true }));
  yield delay();
  yield put(actions.setTenantsState({ tenants: tenantsDemo, loading: false }));
}
export function* tenantsSagasMock() {
  yield takeEvery(actions.loadTenants, loadTenantsMock);
}
