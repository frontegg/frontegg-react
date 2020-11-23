/* istanbul ignore file */

import { useDispatch, useSelector, memoEqual } from '@frontegg/react-core';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions, AuditsState, storeName } from '../Api';

const stateMapper = (state: AuditsState) => state;

export const useAudits = () => {
  const auditsState = useSelector((state: any) => stateMapper(state[storeName]), memoEqual);
  return {
    ...auditsState
  }
}

export const useAuditsActions = () => {
  const dispatch = useDispatch();
  const bindedActions = bindActionCreators(actions, dispatch);
  return {
    ...bindedActions
  }
}