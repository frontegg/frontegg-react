import { createAction } from '@reduxjs/toolkit';
import {
  CreateSamlGroupPayload,
  DeleteSamlGroupPayload,
  SaveSSOConfigurationPayload,
  SSOState,
  UpdateSSOAuthorizationRolesPayload,
} from './interfaces';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { ActionDispatchMatcher, WithCallback } from '../../interfaces';
import { authStoreName } from '../../constants';

const ssoState: SSOState = {
  firstLoad: true,
  loading: true,
  saving: false,
};

const reducers = {
  setSSOState: typeReducerForKey<SSOState>('ssoState'),
  resetSSOState: resetStateByKey<SSOState>('ssoState', { ssoState }),
};

const actions = {
  loadSSOConfigurations: createAction(`${authStoreName}/loadSSOConfigurations`),
  loadSSOAuthorizationRoles: createAction(`${authStoreName}/loadSSOAuthorizationRoles`),
  saveSSOConfigurations: createAction(
    `${authStoreName}/saveSSOConfigurations`,
    (payload: SaveSSOConfigurationPayload) => ({ payload })
  ),
  saveSSOConfigurationsFile: createAction(`${authStoreName}/saveSSOConfigurationsFile`, (payload: File[]) => ({
    payload,
  })),
  validateSSODomain: createAction(`${authStoreName}/validateSSODomain`, (payload?: WithCallback) => ({ payload })),
  updateSSOAuthorizationRoles: createAction(
    `${authStoreName}/updateSSOAuthorizationRoles`,
    (payload: UpdateSSOAuthorizationRolesPayload) => ({ payload })
  ),
  deleteSamlGroup: createAction(`${authStoreName}/deleteSamlGroup`, (payload: DeleteSamlGroupPayload) => ({ payload })),
  createSamlGroup: createAction(`${authStoreName}/createSamlGroup`, (payload: CreateSamlGroupPayload) => ({ payload })),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setSSOState: (state: Partial<SSOState>) => void;
  resetSSOState: () => void;
  loadSSOConfigurations: () => void;
  loadSSOAuthorizationRoles: () => void;
  saveSSOConfigurations: (payload: SaveSSOConfigurationPayload) => void;
  saveSSOConfigurationsFile: (payload: File[]) => void;
  validateSSODomain: (payload?: WithCallback) => void;
  updateSSOAuthorizationRoles: (payload: UpdateSSOAuthorizationRolesPayload) => void;
  deleteSamlGroup: (payload: DeleteSamlGroupPayload) => void;
  createSamlGroup: (payload: CreateSamlGroupPayload) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type SSOActions = DispatchedActions;
export { ssoState, reducers as ssoReducers, actions as ssoActions };
