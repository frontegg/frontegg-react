import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeEvery, all } from 'redux-saga/effects';
import { api, ISamlConfiguration, ISamlRolesGroup, IUpdateSamlConfiguration } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { SaveSSOConfigurationPayload, SSOState } from './interfaces';
import { WithCallback } from '../../interfaces';
import { omitProps, readFileAsText } from '../../helpers';
import { delay } from '../utils';
import { samlConfigurationDemo, samlMetadataDemo, ssoStateDemo } from '../dummy';

function* loadSSOConfigurations() {
  try {
    yield put(actions.setSSOState({ loading: true }));
    const samlConfiguration = yield call(api.auth.getSamlConfiguration);
    yield put(actions.setSSOState({ samlConfiguration, loading: false, firstLoad: false }));
  } catch (e) {
    yield put(actions.setSSOState({ error: e.message, loading: false }));
  }
}

function* saveSSOConfigurationsFile({ payload: configFile }: PayloadAction<File[]>) {
  const oldSamlConfiguration = yield select((state) => state.auth.ssoState.samlConfiguration);
  const loaderKey: keyof SSOState = 'saving';
  yield put(actions.setSSOState({ error: undefined, [loaderKey]: true }));

  try {
    const metadata = yield readFileAsText(configFile[0]);
    const newSamlConfiguration = yield call(api.auth.updateSamlVendorMetadata, { metadata });
    yield put(actions.setSSOState({ samlConfiguration: newSamlConfiguration, error: undefined, [loaderKey]: false }));
  } catch (e) {
    yield put(actions.setSSOState({ samlConfiguration: oldSamlConfiguration, error: e.message, [loaderKey]: false }));
  }
}

function* saveSSOConfigurations({ payload }: PayloadAction<SaveSSOConfigurationPayload>) {
  const { callback, samlVendor, ...newSamlConfiguration } = payload;
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

    updateSamlConfiguration.type = samlVendor?.toLowerCase();

    const newSamlConfiguration = yield call(api.auth.updateSamlConfiguration, updateSamlConfiguration);
    yield put(actions.setSSOState({ samlConfiguration: newSamlConfiguration, error: undefined, [loaderKey]: false }));
    callback?.(true);
  } catch (e) {
    yield put(actions.setSSOState({ samlConfiguration: oldSamlConfiguration, error: e.message, [loaderKey]: false }));
    callback?.(null, e);
  }
}

function* validateSSODomain({ payload: { callback } = {} }: PayloadAction<WithCallback>) {
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
    callback?.(true);
  } catch (e) {
    yield put(
      actions.setSSOState({
        samlConfiguration: { ...samlConfiguration, validated: false },
        error: e.message,
        saving: false,
      })
    );
    callback?.(null, e);
  }
}

function* getAuthorizationRoles() {
  try {
    const data = yield call(api.auth.getSamlRoles);
    const groupsData = yield call(api.auth.getSamlRolesGroups);
    yield put(
      actions.setSSOState({
        authorizationRoles: data.roleIds,
        rolesGroups: groupsData,
        error: undefined,
      })
    );
  } catch (e) {
    yield put(
      actions.setSSOState({
        error: e.message,
      })
    );
  }
}

function* updateRolesGroups(groups: ISamlRolesGroup[]) {
  const prevRolesGroups = yield select((state) => state.auth.ssoState.rolesGroups);
  try {
    const newGroupNames: string[] = groups.map(({ group }: ISamlRolesGroup) => group);
    const deletedGroups =
      prevRolesGroups?.filter(({ group: currentGroup }: ISamlRolesGroup) => !newGroupNames.includes(currentGroup)) ??
      [];
    yield all(
      deletedGroups.map((groupName: string) => call(api.auth.updateSamlRoles, { roleIds: [], group: groupName }))
    );
    yield all(
      groups.map((group: ISamlRolesGroup) =>
        call(api.auth.updateSamlRoles, { roleIds: group.roleIds, group: group.group })
      )
    );
  } catch (e) {
    yield put(
      actions.setSSOState({
        error: e.message,
      })
    );
  }
}

function* updateAuthorizationRoles({
  payload: { callback, authorizationRoles, groups },
}: PayloadAction<WithCallback<{ authorizationRoles: string[]; groups?: ISamlRolesGroup[] }>>) {
  try {
    yield put(actions.setSSOState({ error: undefined, saving: true }));
    yield call(api.auth.updateSamlRoles, { roleIds: authorizationRoles });
    if (groups) {
      yield updateRolesGroups(groups);
    }
    yield getAuthorizationRoles();
    yield put(actions.setSSOState({ error: undefined, saving: false }));
    callback?.(true);
  } catch (e) {
    yield put(
      actions.setSSOState({
        error: e.message,
        saving: false,
      })
    );
    callback?.(null, e);
  }
}

export function* ssoSagas() {
  yield takeEvery(actions.loadSSOConfigurations, loadSSOConfigurations);
  yield takeEvery(actions.saveSSOConfigurations, saveSSOConfigurations);
  yield takeEvery(actions.saveSSOConfigurationsFile, saveSSOConfigurationsFile);
  yield takeEvery(actions.validateSSODomain, validateSSODomain);
  yield takeEvery(actions.loadSSOAuthorizationRoles, getAuthorizationRoles);
  yield takeEvery(actions.updateSSOAuthorizationRoles, updateAuthorizationRoles);
}

/*********************************
 *  Preview Sagas
 *********************************/

function* loadSSOConfigurationsMock() {
  yield put(actions.setSSOState({ loading: true }));
  yield delay();
  yield put(actions.setSSOState({ samlConfiguration: samlConfigurationDemo, loading: false, firstLoad: false }));
}

function* saveSSOConfigurationsFileMock({ payload: configFile }: PayloadAction<File[]>) {
  const loaderKey: keyof SSOState = 'saving';
  yield put(actions.setSSOState({ error: undefined, [loaderKey]: true }));
  const newSamlConfiguration: ISamlConfiguration = { enabled: true, ...configFile[0] };
  yield put(actions.setSSOState({ samlConfiguration: newSamlConfiguration, error: undefined, [loaderKey]: false }));
}

function* saveSSOConfigurationsMock({ payload }: PayloadAction<SaveSSOConfigurationPayload>) {
  const { callback, samlVendor, ...newSamlConfiguration } = payload;
  const ssoState = ssoStateDemo;
  const oldSamlConfiguration = ssoState.samlConfiguration!;
  const samlConfiguration = { ...oldSamlConfiguration, ...newSamlConfiguration };

  let loaderKey: keyof SSOState = 'saving';
  if (samlConfiguration?.enabled !== oldSamlConfiguration.enabled) {
    loaderKey = 'loading';
  }
  const firstTimeConfigure = !samlConfiguration?.domain;
  if (firstTimeConfigure) {
    yield put(actions.setSSOState({ samlConfiguration: { ...oldSamlConfiguration, ...samlConfiguration } }));
    return;
  } else {
    yield put(actions.setSSOState({ error: undefined, [loaderKey]: true }));
  }
  yield delay();
  samlConfiguration.acsUrl = samlMetadataDemo?.configuration?.acsUrl;
  samlConfiguration.spEntityId = samlMetadataDemo?.configuration?.spEntityId;

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

  updateSamlConfiguration.type = samlVendor?.toLowerCase();
  yield delay();
  yield put(actions.setSSOState({ samlConfiguration: updateSamlConfiguration, error: undefined, [loaderKey]: false }));
  callback?.(true);
}

function* validateSSODomainMock({ payload: { callback } = {} }: PayloadAction<WithCallback>) {
  const ssoState = ssoStateDemo;
  const samlConfiguration = ssoState.samlConfiguration!;
  yield put(actions.setSSOState({ error: undefined, saving: true }));
  yield delay();
  yield put(
    actions.setSSOState({
      samlConfiguration: { ...samlConfiguration, validated: true },
      error: undefined,
      saving: false,
    })
  );
  callback?.(true);
}

function* getAuthorizationRolesMock() {
  yield delay();
  const data = { roleIds: ['1', '2', '3'] };
  yield put(
    actions.setSSOState({
      authorizationRoles: data.roleIds,
      error: undefined,
    })
  );
}

function* updateAuthorizationRolesMock({
  payload: { callback, authorizationRoles },
}: PayloadAction<WithCallback<{ authorizationRoles: string[] }>>) {
  yield put(actions.setSSOState({ error: undefined, saving: true }));
  yield delay();
  yield put(actions.setSSOState({ authorizationRoles, error: undefined, saving: false }));
  callback?.(true);
}

export function* ssoSagasMock() {
  yield takeEvery(actions.loadSSOConfigurations, loadSSOConfigurationsMock);
  yield takeEvery(actions.saveSSOConfigurations, saveSSOConfigurationsMock);
  yield takeEvery(actions.saveSSOConfigurationsFile, saveSSOConfigurationsFileMock);
  yield takeEvery(actions.validateSSODomain, validateSSODomainMock);
  yield takeEvery(actions.loadSSOAuthorizationRoles, getAuthorizationRolesMock);
  yield takeEvery(actions.updateSSOAuthorizationRoles, updateAuthorizationRolesMock);
}
