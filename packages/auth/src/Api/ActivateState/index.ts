import { createAction } from '@reduxjs/toolkit';
import { IActivateAccount, IResendActivationEmail } from '@frontegg/rest-api';
import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { ActivateState, ActivateStep } from './interfaces';

export * from './interfaces';

export const activateState: ActivateState = {
  step: ActivateStep.activating,
  loading: false,
  resentEmail: false,
};

export const activateStateReducers = {
  setActivateState: typeReducerForKey<ActivateState>('activateState'),
  resetActivateState: resetStateByKey<ActivateState>('activateState', { activateState }),
};

export const activateActions = {
  activateAccount: createAction(`${storeName}/activateAccount`, (payload: IActivateAccount) => ({ payload })),
  resendActivationEmail: createAction(`${storeName}/resendActivationEmail`, (payload: IResendActivationEmail) => ({
    payload,
  })),
};
