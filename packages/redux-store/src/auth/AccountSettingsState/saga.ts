import { call, put, select, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { api, ISettingsResponse, IUpdateSettings } from '@frontegg/rest-api';
import { WithCallback, WithSilentLoad } from '../../interfaces';
import { delay } from '../utils';

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

/*********************************
 *  Preview Sagas
 *********************************/
function* saveAccountSettingsMock({ payload }: PayloadAction<WithCallback<IUpdateSettings, ISettingsResponse>>) {
  yield put(actions.setAccountSettingsState({ loading: true }));

  yield delay();

  const { accountSettingsState } = yield select((state) => state.auth);
  const { address, timezone, dateFormat, timeFormat, currency, logo } = accountSettingsState;
  const body = {
    address,
    timezone,
    dateFormat,
    timeFormat,
    currency,
    logo,
    ...payload,
  };
  yield put(actions.setAccountSettingsState({ ...body, loading: false }));
  payload.callback?.(body);
}

function* loadAccountSettingsMock({ payload }: PayloadAction<WithCallback<WithSilentLoad<{}>>>) {
  yield put(actions.setAccountSettingsState({ loading: !payload?.silentLoading, error: null }));

  yield delay();
  yield put(
    actions.setAccountSettingsState({
      address: 'Tel-aviv ',
      timezone: 'Asia/Jerusalem',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: 'HH:mm',
      currency: 'USD',
      loading: false,
    })
  );
}

export function* accountSettingsSagaMock() {
  yield takeLeading(actions.saveAccountSettings, saveAccountSettingsMock);
  yield takeLeading(actions.loadAccountSettings, loadAccountSettingsMock);
}
