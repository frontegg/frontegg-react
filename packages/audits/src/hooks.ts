/* istanbul ignore file */

import { useDispatch, useSelector, memoEqual } from '@frontegg/react-core';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions, AuditsState, AuditsActions, storeName } from './Api';

const stateMapper = (state: AuditsState) => state;

export const useAudits = () => {
  const dispatch = useDispatch();
  const bindedActions = bindActionCreators(actions, dispatch);
  const state = useSelector((state: any) => stateMapper(state[storeName]), memoEqual);
  return {
    ...state,
    ...bindedActions,
  };
};
