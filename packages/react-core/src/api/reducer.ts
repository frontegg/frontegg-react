import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { defaultReducerActions } from '@api/ApiUtils';
import { reportsInitialState, reportsReducers } from '@api/ReportsApi';
import { webhooksInitialState, webhooksReducers } from '@api/WebhooksApi';
import { FronteggState } from '@api/interfaces';
import { Dispatch } from 'redux';


const initialState: FronteggState = {
  ...reportsInitialState,
  ...webhooksInitialState,
};

const { reducer, actions } = createSlice({
  name: 'frontegg',
  initialState,
  reducers: {
    ...defaultReducerActions<FronteggState>(),
    ...reportsReducers,
    ...webhooksReducers,
  },
});

export {
  initialState,
  reducer,
  actions,
};

export const sagaState = ({ config, ...state }: FronteggState) => ({ config, state });

export const sagaActions = (dispatch: Dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

