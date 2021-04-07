import { PayloadAction } from '@reduxjs/toolkit';
import { AuditsState } from './interfaces';

export const typeReducerForKey = <T>(key: keyof AuditsState) => ({
  prepare: (payload: Partial<T>) => ({ payload }),
  reducer: (state: AuditsState, { payload }: PayloadAction<Partial<T>>) => {
    return {
      ...state,
      [key]: {
        ...state[key],
        ...payload,
      },
    };
  },
});
