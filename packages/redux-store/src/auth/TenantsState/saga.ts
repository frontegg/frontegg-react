import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api, ISwitchTenant, ITenantsResponse } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { WithCallback } from '../../interfaces';
import { delay } from '../utils';
import { tenantsDemo } from '../dummy';
import { refreshToken } from '../LoginState/saga';

function* switchTenant({ payload: { tenantId, callback } }: PayloadAction<WithCallback<ISwitchTenant>>) {
  yield put(actions.setState({ isLoading: true }));
  try {
    yield call(api.tenants.switchTenant, { tenantId });
    yield call(refreshToken);
    const callbackConsumed = callback?.(true);
    if (!callbackConsumed) {
      yield put(actions.setState({ isLoading: false }));
    }
  } catch (e) {
    yield put(actions.setState({ isLoading: false }));
    callback?.(false, e);
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
