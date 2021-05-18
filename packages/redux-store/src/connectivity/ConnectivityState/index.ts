import { PayloadAction } from '../../toolkit/redux';
import { IConnectivityState, TPlatform, TPostData } from '../interfaces';
import { createAction } from '@reduxjs/toolkit';
import { connectivityStoreName } from '../../constants';
import { IWebhookTest } from '@frontegg/rest-api';

export const initialState: IConnectivityState = {
  isLoading: false,
  isSaving: false,
  list: [],
  processIds: [],
  slackChannels: {
    isLoading: false,
  },
};

const reducers = {
  initData: () => ({ ...initialState }),
  //deprecated use initData instead;
  // cleanData: () => ({ ...initialState }),
  setConnectivityState: (state: IConnectivityState, { payload }: PayloadAction<Partial<IConnectivityState>>) => ({
    ...state,
    ...payload,
  }),
};

const actions = {
  loadSlackActions: createAction(`${connectivityStoreName}/loadSlack`),
  loadDataAction: createAction(`${connectivityStoreName}/loadData`, (payload: TPlatform[] | undefined) => ({
    payload,
  })),
  postDataAction: createAction(`${connectivityStoreName}/postData`, (payload: TPostData) => ({ payload })),
  postCodeAction: createAction(`${connectivityStoreName}/postCode`, (payload: string) => ({ payload })),
  loadScope: createAction(`${connectivityStoreName}/loadScope`),
  deleteWebhookConfigAction: createAction(`${connectivityStoreName}/deleteWebhookConfig`, (payload: string) => ({
    payload,
  })),
  postWebhookTestAction: createAction(`${connectivityStoreName}/deleteWebhookConfig`, (payload: IWebhookTest) => ({
    payload,
  })),
  loadWebhookLogsAction: createAction(
    `${connectivityStoreName}/loadWebhookLogs`,
    (id: string, offset: number = 0, limit: number = 10) => ({ payload: { id, offset, limit } })
  ),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setConnectivityState: (state: Partial<IConnectivityState>) => void;
  initData: () => void;
  loadSlackActions: () => void;
  loadDataAction: (payload: TPlatform[] | undefined) => void;
  postDataAction: (payload: TPostData) => void;
  postCodeAction: (payload: string) => void;
  loadScope: () => void;
  deleteWebhookConfigAction: (payload: string) => void;
  postWebhookTestAction: (payload: IWebhookTest) => void;
  loadWebhookLogsAction: (id: string, offset: number, limit: number) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
// const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type ConnectivityActions = DispatchedActions;
export { reducers as connectivityReducers, actions as connectivityActions };
