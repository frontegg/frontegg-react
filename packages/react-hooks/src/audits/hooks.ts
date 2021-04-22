import { useMemo } from 'react';
import { bindActionCreators, CaseReducerActions, SliceCaseReducers } from '@frontegg/redux-store/toolkit';

import { auditsActions, AuditsActions, AuditsState, auditsStoreName } from '@frontegg/redux-store/audits';
import { shallowEqual, useDispatch, useSelector } from '../FronteggProvider';

export type AuthStateMapper<S extends object> = (state: AuditsState) => S;
export type StateHookFunction<T> = (() => T) & (<S extends object>(mapper: (state: T) => S) => S);

export const useAuditsState = <S extends object>(stateMapper?: AuthStateMapper<S>): S => {
  return useSelector(
    (state: any) => stateMapper?.(state[auditsStoreName]) ?? state[auditsStoreName],
    shallowEqual
  ) as S;
};

export const useAuditsActions = (): AuditsActions => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(auditsActions, dispatch), [auditsActions]);
};

/**
 * hooks helpers
 */
export const sliceReducerActionsBy = <T extends SliceCaseReducers<any>>(reducer: T): CaseReducerActions<T> => {
  const reducerKeys = Object.keys(reducer);
  const reducerActions = reducerKeys.map((key) => ({ [key]: auditsActions[key as keyof AuditsActions] }));
  return reducerActions.reduce((p, n) => ({ ...p, ...n }), {}) as CaseReducerActions<T>;
};
export const stateHookGenerator = (stateMapper: any, subState: keyof AuditsState): any => {
  return useSelector(
    (state: any) => stateMapper?.(state[auditsStoreName][subState]) ?? state[auditsStoreName][subState],
    shallowEqual
  );
};
export const reducerActionsGenerator = (actions: any, reducers: SliceCaseReducers<any>) => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators({ ...actions, ...sliceReducerActionsBy(reducers) }, dispatch), [dispatch]);
};
