import { Dispatch } from 'redux';
import { initialState as contextInitialState, ContextOptions } from '../context';
import * as Reports from '../../plugins/reports/reducer';
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { IPluginConfigs } from './interfaces';
import { defaultReducerActions } from '@helpers/sagaHelpers';

export type FronteggState = {
    context?: ContextOptions | null;
  }
  & IPluginConfigs
  & Reports.ReportState

const initialState: FronteggState = {
  context: contextInitialState,
  config: { reportsConfig: { rootDir: '/reports' } },
  ...Reports.initialState,
};

const { reducer, actions } = createSlice({
  name: 'frontegg',
  initialState,
  reducers: {
    ...defaultReducerActions<FronteggState>(),
    ...Reports.reducers,
  },
});

const mapperActions = {
  ...Reports.actions,
};

const reducerActions = {
  ...actions,
  ...Reports.actions,
};

export {
  initialState,
  reducer,
  reducerActions,
};


export const sagaState = ({ config, ...state }: FronteggState) => ({ config, state });

export const sagaActions = (dispatch: Dispatch) => ({ actions: bindActionCreators(mapperActions, dispatch) });
