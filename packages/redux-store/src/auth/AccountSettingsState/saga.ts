import { call, put, select, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { api, IUpdateSettings } from '@frontegg/rest-api';
import { WithCallback, WithSilentLoad } from '../../interfaces';

function* saveAccountSettings({ payload }: PayloadAction<IUpdateSettings>) {
  try {
    yield put(actions.setAccountSettingsState({ loading: true }));
    const { accountSettingsState } = yield select((state) => state.auth);
    const { address, timezone, dateFormat, timeFormat, currency, logo } = accountSettingsState;
    const body = yield call(api.accountSettings.updateSettings, {
      address,
      timezone,
      dateFormat,
      timeFormat,
      currency,
      logo,
      ...payload,
    });
    yield put(actions.setAccountSettingsState({ ...body, loading: false }));
  } catch (e) {
    yield put(actions.setAccountSettingsState({ loading: false, error: e.message }));
  }
}

function* loadAccountSettings({ payload }: PayloadAction<WithCallback<WithSilentLoad<{}>>>) {
  yield put(actions.setAccountSettingsState({ loading: !payload?.silentLoading, error: null }));
  try {
    const body = yield call(api.accountSettings.getSettings);
    yield put(actions.setAccountSettingsState({ ...body, loading: false }));
  } catch (e) {
    yield put(actions.setAccountSettingsState({ loading: false, error: e.message }));
  }
}

export function* accountSettingsSaga() {
  yield takeLeading(actions.saveAccountSettings, saveAccountSettings);
  yield takeLeading(actions.loadAccountSettings, loadAccountSettings);
}
