import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { defaultReducerActions } from '@api/ApiUtils';
import { reportsInitialState, reportsReducers } from '@api/ReportsApi';
import { webhooksInitialState, webhooksReducers } from '@api/WebhooksApi';
import { authInitialState, authReducers } from '@api/AuthApi';
import { FronteggState } from '@api/interfaces';
import { Dispatch } from 'redux';


const initialState: FronteggState = {
  ...reportsInitialState,
  ...webhooksInitialState,
  ...authInitialState,
};

const { reducer, actions } = createSlice({
  name: 'frontegg',
  initialState,
  reducers: {
    ...defaultReducerActions<FronteggState>(),
    ...reportsReducers,
    ...webhooksReducers,
    ...authReducers,
  },
});

export {
  initialState,
  reducer,
  actions,
};

export const sagaState = ({ config, ...state }: FronteggState) => ({ config, state });

export const sagaActions = (dispatch: Dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

