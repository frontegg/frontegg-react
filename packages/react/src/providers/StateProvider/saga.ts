import { Dispatch } from 'redux';
import { call } from 'redux-saga/effects';
import {
  initialState as contextInitialState,
  ContextOptions,
} from '../context';
import {
  ReportState,
  initialState as reportsInitialState,
  actions as reportsActions,
  reducers as reportsReducer,
  rootSaga as reportsSaga,
} from '../../plugins/reports/reducer';
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { ActionPrefix } from '../contstants';


export interface FronteggState extends ReportState {
  context?: ContextOptions | null;
}

const initialState: FronteggState = {
  context: contextInitialState,
  ...reportsInitialState,
};

const { reducer, actions } = createSlice({
  name: ActionPrefix,
  initialState,
  reducers: {
    ...reportsReducer,
  },
});

const mapperActions = {
  ...reportsActions,
};

function* rootSaga() {
  yield call(reportsSaga);
}

export {
  initialState,
  reducer,
  actions,
  rootSaga,
};


export const sagaState = (state: FronteggState) => ({ state });

export const sagaActions = (dispatch: Dispatch) => ({ actions: bindActionCreators(mapperActions, dispatch) });

