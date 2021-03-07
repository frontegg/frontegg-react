import { call, put, select, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { api, ISettingsResponse, IUpdateSettings } from '@frontegg/rest-api';
import { WithCallback, WithSilentLoad } from '../../interfaces';

function* saveAccountSettings({ payload }: PayloadAction<WithCallback<IUpdateSettings, ISettingsResponse>>) {
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
    payload.callback?.(body);
  } catch (e) {
    yield put(actions.setAccountSettingsState({ loading: false, error: e.message }));
    payload.callback?.(null, e);
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
