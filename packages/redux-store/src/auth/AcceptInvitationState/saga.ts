import { call, put, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { api, IAcceptInvitation } from '@frontegg/rest-api';
import { AcceptInvitationStep } from './interfaces';

function* acceptInvitation({ payload }: PayloadAction<IAcceptInvitation>) {
  if (!payload.token || !payload.userId) {
    return yield put(actions.setAcceptInvitationState({ error: undefined, step: AcceptInvitationStep.invalid }));
  }

  try {
    yield put(actions.setAcceptInvitationState({ error: undefined, step: AcceptInvitationStep.pending }));
    yield call(api.auth.acceptInvitation, payload);

    yield put(
      actions.setState({
        isAuthenticated: false,
        user: null,
        acceptInvitationState: { error: undefined, step: AcceptInvitationStep.success },
      })
    );
  } catch (e) {
    yield put(actions.setAcceptInvitationState({ step: AcceptInvitationStep.failed, error: e.message }));
  }
}

export function* acceptInvitationSagas() {
  yield takeLeading(actions.acceptInvitation, acceptInvitation);
}
