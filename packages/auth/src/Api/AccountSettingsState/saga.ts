import { call, put, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { api, IUpdateSettings } from '@frontegg/rest-api';

function* updateAccountSettingsFunction({ payload }: PayloadAction<IUpdateSettings>) {
  try {
    yield put(actions.setAccountSettingsState({ loading: true }));
    const { body } = yield call(api.accountSettings.updateSettings, payload);
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
