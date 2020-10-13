import { createAction } from '@reduxjs/toolkit';
import { IDisableMfa, IVerifyMfa } from '@frontegg/react-core';
import { MFAState, MFAStep } from './interfaces';
import { resetStateByKey, storeName, typeReducerForKey } from '../utils';

export * from './interfaces';

export const mfaState: MFAState = {
  step: MFAStep.verify,
  loading: false,
};

export const mfaStateReducers = {
  setMfaState: typeReducerForKey<MFAState>('mfaState'),
  resetMfaState: resetStateByKey<MFAState>('mfaState', { mfaState }),
};

export const mfaActions = {
  enrollMfa: createAction(`${storeName}/enrollMfa`, (payload = {}) => ({ payload })),
  verifyMfa: createAction(`${storeName}/verifyMfa`, (payload: IVerifyMfa) => ({ payload })),
  disableMfa: createAction(`${storeName}/disableMfa`, (payload: IDisableMfa, callback?: () => void) => ({
    payload: { ...payload, callback },
  })),
};
