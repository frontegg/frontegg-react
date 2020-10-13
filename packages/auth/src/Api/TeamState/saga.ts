import { takeEvery, put, call } from 'redux-saga/effects';
import { actions } from '../reducer';
import {
  api,
  IAddUser,
  ILoadUsers,
  IResendActivationLink,
  ISendResetPasswordLink,
  ITeamUser,
} from '@frontegg/react-core';
import { PayloadAction } from '@reduxjs/toolkit';
import { WithCallback, WithSilentLoad } from '../interfaces';
import { TeamStateKeys } from './interfaces';

function* loadUsers({ payload }: PayloadAction<WithSilentLoad<ILoadUsers>>) {
  const { silentLoading, ...body } = payload;
  yield put(actions.setTeamLoader({ key: TeamStateKeys.USERS, value: true }));
  try {
    const { items: users, totalPages } = yield call(api.teams.loadUsers, body);
  } catch (e) {
    yield put(actions.setTeamError({ key: TeamStateKeys.USERS, value: e.message }));
    yield put(actions.setTeamState({ totalPages: 0, users: [] }));
  }
  yield put(actions.setTeamLoader({ key: TeamStateKeys.USERS, value: false }));
}

function* addUser({ payload }: PayloadAction<WithCallback<IAddUser, ITeamUser>>) {
  const { callback, ...body } = payload;
  yield put(actions.setTeamLoader({ key: TeamStateKeys.ADD_USER, value: true }));
  try {
    const newUser = yield call(api.teams.addUser, body);
    callback?.(newUser);
  } catch (e) {
    yield put(actions.setTeamError({ key: TeamStateKeys.ADD_USER, value: e.message }));
    callback?.(null, e.message);
  }
  yield put(actions.setTeamLoader({ key: TeamStateKeys.ADD_USER, value: false }));
}

function* resendActivationLink({ payload }: PayloadAction<WithCallback<IResendActivationLink, boolean>>) {
  const { callback, ...body } = payload;
  yield put(actions.setTeamLoader({ key: TeamStateKeys.RESEND_ACTIVATE_LINK, value: true }));
  try {
    yield call(api.teams.resendActivationLink, body);
    callback?.(true);
  } catch (e) {
    yield put(actions.setTeamError({ key: TeamStateKeys.RESEND_ACTIVATE_LINK, value: e.message }));
    callback?.(null, e.message);
  }
  yield put(actions.setTeamLoader({ key: TeamStateKeys.RESEND_ACTIVATE_LINK, value: false }));
}

function* sendResetPasswordLink({ payload }: PayloadAction<WithCallback<ISendResetPasswordLink, boolean>>) {
  const { callback, ...body } = payload;
  yield put(actions.setTeamLoader({ key: TeamStateKeys.SEND_RESET_PASSWORD_LINK, value: true }));
  try {
    yield call(api.teams.sendResetPasswordLink, body);
    callback?.(true);
  } catch (e) {
    yield put(actions.setTeamError({ key: TeamStateKeys.SEND_RESET_PASSWORD_LINK, value: e.message }));
    callback?.(null, e.message);
  }
  yield put(actions.setTeamLoader({ key: TeamStateKeys.SEND_RESET_PASSWORD_LINK, value: false }));
}

export function* teamSagas() {
  yield takeEvery(actions.loadUsers, loadUsers);
  yield takeEvery(actions.addUser, addUser);
  yield takeEvery(actions.resendActivationLink, resendActivationLink);
  yield takeEvery(actions.sendResetPasswordLink, sendResetPasswordLink);
}
