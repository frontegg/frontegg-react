import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions } from '../reducer';
import { api, ISamlConfiguration, IUpdateSamlConfiguration, omitProps } from '@frontegg/react-core';
import { PayloadAction } from '@reduxjs/toolkit';
import { SSOState } from './interfaces';

function* loadSSOConfigurations() {
  try {
    yield put(actions.setSSOState({ loading: true }));
    const samlConfiguration = yield call(api.auth.getSamlConfiguration);
    yield put(actions.setSSOState({ samlConfiguration, loading: false, firstLoad: false }));
  } catch (e) {
    yield put(actions.setSSOState({ error: e.message, loading: false }));
  }
}

function* saveSSOConfigurations({ payload: samlConfiguration }: PayloadAction<Partial<ISamlConfiguration>>) {
  const oldSamlConfiguration = yield select((state) => state.auth.ssoState.samlConfiguration);

  let loaderKey: keyof SSOState = 'loading';
  if (samlConfiguration?.domain !== oldSamlConfiguration.domain) {
    loaderKey = 'saving';
  }
  try {
    const firstTimeConfigure = !samlConfiguration?.domain;
    if (firstTimeConfigure) {
      yield put(actions.setSSOState({ samlConfiguration: { ...oldSamlConfiguration, ...samlConfiguration } }));
      return;
    } else {
      yield put(actions.setSSOState({ error: undefined, [loaderKey]: true }));
    }

    const updateSamlConfiguration: IUpdateSamlConfiguration = omitProps(samlConfiguration, [
      'validated',
      'generatedVerification',
      'createdAt',
      'updatedAt',
    ]);

    const newSamlConfiguration = yield call(api.auth.updateSamlConfiguration, updateSamlConfiguration);
    yield put(actions.setSSOState({ samlConfiguration: newSamlConfiguration, error: undefined, [loaderKey]: false }));
  } catch (e) {
    yield put(actions.setSSOState({ samlConfiguration: oldSamlConfiguration, error: e.message, [loaderKey]: false }));
  }
}

function* validateSSODomain() {
  const samlConfiguration = yield select((state) => state.auth.ssoState.samlConfiguration);
  try {
    yield put(actions.setSSOState({ error: undefined, saving: true }));
    yield call(api.auth.validateSamlDomain);
    yield put(
      actions.setSSOState({
        samlConfiguration: { ...samlConfiguration, validated: true },
        error: undefined,
        saving: false,
      })
    );
  } catch (e) {
    yield put(
      actions.setSSOState({
        samlConfiguration: { ...samlConfiguration, validated: false },
        error: e.message,
        saving: false,
      })
    );
  }
}

export function* ssoSagas() {
  yield takeEvery(actions.loadSSOConfigurations, loadSSOConfigurations);
  yield takeEvery(actions.saveSSOConfigurations, saveSSOConfigurations);
  yield takeEvery(actions.validateSSODomain, validateSSODomain);
}
