import { call, put, select, takeEvery } from 'redux-saga/effects';
import { actions } from '../reducer';
import { api, ISamlConfiguration, IUpdateSamlConfiguration } from '@frontegg/rest-api';
import { omitProps } from '@frontegg/react-core';
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

const getData = (file: File) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result);
  });

function* saveSSOConfigurationsFile({ payload: configFile }: PayloadAction<File[]>) {
  const oldSamlConfiguration = yield select((state) => state.auth.ssoState.samlConfiguration);
  const loaderKey: keyof SSOState = 'saving';
  yield put(actions.setSSOState({ error: undefined, [loaderKey]: true }));

  try {
    const metadata = yield getData(configFile[0]);
    const newSamlConfiguration = yield call(api.auth.updateSamlVendorMetadata, { metadata });
    yield put(actions.setSSOState({ samlConfiguration: newSamlConfiguration, error: undefined, [loaderKey]: false }));
  } catch (e) {
    yield put(actions.setSSOState({ samlConfiguration: oldSamlConfiguration, error: e.message, [loaderKey]: false }));
  }
}

function* saveSSOConfigurations({ payload: newSamlConfiguration }: PayloadAction<Partial<ISamlConfiguration>>) {
  const oldSamlConfiguration = yield select((state) => state.auth.ssoState.samlConfiguration);

  const samlConfiguration = { ...oldSamlConfiguration, ...newSamlConfiguration };

  let loaderKey: keyof SSOState = 'saving';
  if (samlConfiguration?.enabled !== oldSamlConfiguration.enabled) {
    loaderKey = 'loading';
  }
  try {
    const firstTimeConfigure = !samlConfiguration?.domain;
    if (firstTimeConfigure) {
      yield put(actions.setSSOState({ samlConfiguration: { ...oldSamlConfiguration, ...samlConfiguration } }));
      return;
    } else {
      console.log('loaderKey', loaderKey);
      yield put(actions.setSSOState({ error: undefined, [loaderKey]: true }));
    }

    const samlMetadata = yield call(api.metadata.getSamlMetadata);
    samlConfiguration.acsUrl = samlMetadata?.configuration?.acsUrl;
    samlConfiguration.spEntityId = samlMetadata?.configuration?.spEntityId;

    const updateSamlConfiguration: IUpdateSamlConfiguration = omitProps(samlConfiguration, [
      'validated',
      'generatedVerification',
      'createdAt',
      'updatedAt',
    ]);
    if (oldSamlConfiguration?.domain !== updateSamlConfiguration?.domain) {
      updateSamlConfiguration.ssoEndpoint = '';
      updateSamlConfiguration.publicCertificate = '';
      updateSamlConfiguration.signRequest = false;
    }

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
  yield takeEvery(actions.saveSSOConfigurationsFile, saveSSOConfigurationsFile);
  yield takeEvery(actions.validateSSODomain, validateSSODomain);
}
