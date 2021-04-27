import { createAction } from '@reduxjs/toolkit';
import {
  IActivateAccount,
  IGetActivateAccountStrategy,
  IGetActivateAccountStrategyResponse,
  IResendActivationEmail,
} from '@frontegg/rest-api';
import { resetStateByKey, typeReducerForKey, typeReducerNestedKey } from '../utils';
import { ActivateAccountState, ActivateAccountStep, ActivateAccountStrategyState } from './interfaces';
import { ActionDispatchMatcher, WithCallback } from '../../interfaces';
import { authStoreName } from '../../constants';

const activateState: ActivateAccountState = {
  step: ActivateAccountStep.activating,
  loading: false,
  resentEmail: false,
  activationStrategy: {
    loading: false,
  },
};

const reducers = {
  setActivateState: typeReducerForKey<ActivateAccountState>('activateState'),
  resetActivateState: resetStateByKey<ActivateAccountState>('activateState', { activateState }),
  setActivateStrategyState: typeReducerNestedKey<ActivateAccountState, ActivateAccountStrategyState>(
    'activateState',
    'activationStrategy'
  ),
};

const actions = {
  activateAccount: createAction(`${authStoreName}/activateAccount`, (payload: IActivateAccount) => ({ payload })),
  getActivateAccountStrategy: createAction(
    `${authStoreName}/getActivateAccountStrategy`,
    (payload: WithCallback<IGetActivateAccountStrategy, IGetActivateAccountStrategyResponse>) => ({ payload })
  ),
  resendActivationEmail: createAction(`${authStoreName}/resendActivationEmail`, (payload: IResendActivationEmail) => ({
    payload,
  })),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setActivateState: (state: Partial<ActivateAccountState>) => void;
  resetActivateState: () => void;
  setActivateStrategyState: (state: Partial<ActivateAccountStrategyState>) => void;
  activateAccount: (payload: IActivateAccount) => void;
  resendActivationEmail: (payload: IResendActivationEmail) => void;
  getActivateAccountStrategy: (
    payload: WithCallback<IGetActivateAccountStrategy, IGetActivateAccountStrategyResponse>
  ) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type ActivateAccountActions = DispatchedActions;
export { activateState, reducers as activateAccountReducers, actions as activateAccountActions };
