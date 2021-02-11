import { PayloadAction } from '@reduxjs/toolkit';
import { AuditsFilter, AuditsState } from './interfaces';

export const resetStateByKey = <T>(initialState: Partial<AuditsState>) => () => initialState;
export const typeReducerForKey = <T>() => ({
  prepare: (payload: Partial<T>) => ({ payload }),
  reducer: (state: AuditsState, { payload }: PayloadAction<Partial<T>>) => {
    return {
      ...state,
      ...payload,
    };
  },
});

export const filterToObject = (arr: AuditsFilter[]) => {
  return arr.reduce((res: Record<string, string>, curr) => {
    res[curr.key] = curr.value;
    return res;
  }, {});
};
