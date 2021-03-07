import { call, put, select, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { api, IUpdateSettings } from '@frontegg/rest-api';
import { WithCallback } from '../interfaces';

function* updateAccountSettingsFunction({ payload }: PayloadAction<WithCallback<IUpdateSettings>>) {
  try {
    yield put(actions.setAccountSettingsState({ loading: true }));
    const { accountSettingsState } = yield select((state) => state.auth);
    const { loading, ...stateWithoutLoading } = accountSettingsState;
    const { body } = yield call(api.accountSettings.updateSettings, { ...stateWithoutLoading, ...payload });
    yield put(actions.setAccountSettingsState({ ...body, loading: false }));
  } catch (e) {
    yield put(actions.setAccountSettingsState({ loading: false, error: e.message }));
  }
}

function* getAccountSettingsFunction() {
  try {
    yield put(actions.setAccountSettingsState({ loading: true }));
    const { body } = yield call(api.accountSettings.getSettings);
    yield put(actions.setAccountSettingsState({ ...body, loading: false }));
  } catch (e) {
    yield put(actions.setAccountSettingsState({ loading: false, error: e.message }));
  }
}

export function* accountSettingsSaga() {
  yield takeLeading(actions.updateAccountSettings, updateAccountSettingsFunction);
  yield takeLeading(actions.getAccountSettings, getAccountSettingsFunction);
}
