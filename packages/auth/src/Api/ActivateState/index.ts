import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { ActivateActions, ActivateState, ActivateStep } from './interfaces';
import { createAction } from '@reduxjs/toolkit';
import { IActivateAccount } from '@frontegg/react-core';

export * from './interfaces';

export const activateState: ActivateState = {
  step: ActivateStep.activating,
  loading: false,
};

export const activateStateReducers = {
  setActivateState: typeReducerForKey<ActivateState>('activateState'),
  resetActivateState: resetStateByKey<ActivateState>('activateState'),
};

export const activateActions: ActivateActions = {
  activateAccount: createAction(`${storeName}/activateAccount`, (payload: IActivateAccount) => ({ payload })),
};
