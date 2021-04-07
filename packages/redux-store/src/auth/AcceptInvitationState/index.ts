import { createAction } from '@reduxjs/toolkit';
import { IAcceptInvitation } from '@frontegg/rest-api';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { AcceptInvitationState, AcceptInvitationStep } from './interfaces';
import { authStoreName } from '../../constants';
import { ActionDispatchMatcher } from '../../interfaces';

const acceptInvitationState: AcceptInvitationState = {
  step: AcceptInvitationStep.validate,
};

const reducers = {
  setAcceptInvitationState: typeReducerForKey<AcceptInvitationState>('acceptInvitationState'),
  resetAcceptInvitationState: resetStateByKey<AcceptInvitationState>('acceptInvitationState', {
    acceptInvitationState,
  }),
};

const actions = {
  acceptInvitation: createAction(`${authStoreName}/acceptInvitation`, (payload: IAcceptInvitation) => ({ payload })),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setAcceptInvitationState: (state: Partial<AcceptInvitationState>) => void;
  resetAcceptInvitationState: () => void;
  acceptInvitation: (payload: IAcceptInvitation) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type AcceptInvitationActions = DispatchedActions;
export { acceptInvitationState, reducers as acceptInvitationReducers, actions as acceptInvitationActions };
