import { call, put, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { api, IActivateAccount } from '@frontegg/rest-api';
import { ActivateStep } from './interfaces';

function* activateAccount({ payload }: PayloadAction<IActivateAccount>) {
  yield put(actions.setActivateState({ loading: true }));
  try {
    yield call(api.auth.activateAccount, payload);
    yield put(
      actions.setState({
        isAuthenticated: false,
        user: null,
        activateState: { loading: false, error: undefined, step: ActivateStep.success },
      })
    );
  } catch (e) {
    yield put(actions.setActivateState({ loading: false, error: e.message }));
  }
}

export function* activateSagas() {
  yield takeLeading(actions.activateAccount, activateAccount);
}
