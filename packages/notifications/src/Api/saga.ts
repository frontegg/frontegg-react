// import { subSagaExampleSagas } from './SubState/saga';
import { all, call } from 'redux-saga/effects';

export function* sagas() {
  yield all([
    // call(subSagaExampleSagas),
  ]);
}
