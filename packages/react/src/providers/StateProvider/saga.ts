import { combineReducers } from 'redux';
import { call } from 'redux-saga/effects';
import { ContextOptions } from '../context';
import {
  ReportState,
  initialState as reportsInitialState,
  actions as reportsActions,
  reducer as reportsReducer,
  rootSaga as reportsSaga,
} from '../../plugins/reports/reducer';


export interface FronteggState {
  context: ContextOptions | null;
  reports: ReportState;
}


const initialState: FronteggState = {
  context: null,
  reports: reportsInitialState,
};


const reducer = combineReducers({
  reports: reportsReducer,
});

function* rootSaga() {
  yield call(reportsSaga);
}

const actions = {
  reports: reportsActions,
};

export {
  initialState,
  reducer,
  actions,
  rootSaga,
};
