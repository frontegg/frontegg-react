import { CaptchaState } from './interfaces';
import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { createAction } from '@reduxjs/toolkit';

export * from './interfaces';

export const captchaState: CaptchaState = {
  enabled: false,
  loading: false,
};

export const captchaStateReducers = {
  setCaptchaState: typeReducerForKey<CaptchaState>('captchaState'),
  resetCaptchaState: resetStateByKey<CaptchaState>('captchaState', { captchaState }),
};

export const captchaActions = {
  loadCaptchaPolicy: createAction(`${storeName}/loadCaptchaPolicy`),
};
