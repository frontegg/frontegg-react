import { createAction } from '@reduxjs/toolkit';
import { IActivateAccount } from '@frontegg/rest-api';
import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { ActivateState, ActivateStep } from './interfaces';

export * from './interfaces';

export const activateState: ActivateState = {
  step: ActivateStep.activating,
  loading: false,
};

export const activateStateReducers = {
  setActivateState: typeReducerForKey<ActivateState>('activateState'),
  resetActivateState: resetStateByKey<ActivateState>('activateState', { activateState }),
};

export const activateActions = {
  activateAccount: createAction(`${storeName}/activateAccount`, (payload: IActivateAccount) => ({ payload })),
};
