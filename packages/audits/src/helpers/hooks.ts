import { useMemo } from 'react';
import { useDispatch, useSelector, memoEqual } from '@frontegg/react-core';
import { bindActionCreators } from '@reduxjs/toolkit';
import {
  actions,
  OldAuditsState as AuditsState,
  OldAuditsActions as AuditsActions,
  storeName,
} from '@frontegg/redux-store';

export type AuditsStateMapper<S extends object> = (state: AuditsState) => S;
const defaultAuditsStateMapper: any = (state: AuditsState) => ({ ...state });

export const useAuditsState = <S extends object>(stateMapper: AuditsStateMapper<S> = defaultAuditsStateMapper): S => {
  const auditsState = useSelector((state: any) => stateMapper(state[storeName]), memoEqual);
  return {
    ...auditsState,
  };
};

export const useAuditsActions = (): AuditsActions => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [bindActionCreators, dispatch, actions]);
};
