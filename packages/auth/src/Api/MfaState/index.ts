import { createAction } from '@reduxjs/toolkit';
import { IDisableMfa, ILoginWithMfa, IVerifyMfa } from '@frontegg/rest-api';
import { MFAState, MFAStep } from './interfaces';
import { storeName, typeReducerForKey } from '../utils';
import { WithCallback } from '../interfaces';

export * from './interfaces';

export const mfaState: MFAState = {
  step: MFAStep.verify,
  loading: false,
};

export const mfaStateReducers = {
  setMfaState: typeReducerForKey<MFAState>('mfaState'),
};

export const mfaActions = {
  resetMfaState: createAction(`${storeName}/resetMfaState`),
  enrollMfa: createAction(`${storeName}/enrollMfa`, (payload = {}) => ({ payload })),
  verifyMfa: createAction(`${storeName}/verifyMfa`, (payload: WithCallback<IVerifyMfa>) => ({ payload })),
  verifyMfaAfterForce: createAction(`${storeName}/verifyMfaAfterForce`, (payload: WithCallback<ILoginWithMfa>) => ({
    payload,
  })),
  disableMfa: createAction(`${storeName}/disableMfa`, (payload: IDisableMfa, callback?: () => void) => ({
    payload: { ...payload, callback },
  })),
};
