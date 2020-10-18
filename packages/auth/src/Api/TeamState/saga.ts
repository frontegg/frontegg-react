import { takeEvery, put, call, select } from 'redux-saga/effects';
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
import { ISetAddUserDialog, ISetDeleteUserDialog, TeamStateKeys } from './interfaces';

function* loadUsers({ payload }: PayloadAction<WithSilentLoad<ILoadUsers>>) {
  const { silentLoading, ...body } = payload;
  const pageSize = payload.pageSize ?? (yield select((state) => state.auth.teamState.pageSize));
  yield put(actions.setTeamLoader({ key: TeamStateKeys.USERS, value: !silentLoading }));
  try {
    const { items: users, totalPages } = yield call(api.teams.loadUsers, { ...body, pageSize });
    const roles = yield call(api.teams.loadAvailableRoles);
    yield put(actions.setTeamState({ users, totalPages, pageSize, roles }));
  } catch (e) {
    yield put(actions.setTeamError({ key: TeamStateKeys.USERS, value: e.message }));
    yield put(actions.setTeamState({ totalPages: 0, users: [] }));
  }
  yield put(actions.setTeamLoader({ key: TeamStateKeys.USERS, value: false }));
}

function* addUser({ payload }: PayloadAction<WithCallback<IAddUser, ITeamUser>>) {
  const { callback, ...body } = payload;
  const teamState = yield select((state) => state.auth.teamState);
  yield put(
    actions.setTeamState({
      addUserDialogState: {
        ...teamState.addUserDialogState,
        loading: true,
      },
    })
  );
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
  yield put(actions.setTeamLoader({ key: TeamStateKeys.RESEND_ACTIVATE_LINK, value: body.userId }));
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
  yield put(actions.setTeamLoader({ key: TeamStateKeys.SEND_RESET_PASSWORD_LINK, value: body.userId }));
  try {
    yield call(api.teams.sendResetPasswordLink, body);
    callback?.(true);
  } catch (e) {
    yield put(actions.setTeamError({ key: TeamStateKeys.SEND_RESET_PASSWORD_LINK, value: e.message }));
    callback?.(null, e.message);
  }
  yield put(actions.setTeamLoader({ key: TeamStateKeys.SEND_RESET_PASSWORD_LINK, value: false }));
}

function* openAddUserDialog({ payload }: PayloadAction<ISetAddUserDialog | undefined>) {
  yield put(
    actions.setTeamState({
      addUserDialogState: {
        open: true,
        loading: false,
        error: false,
        ...payload,
      },
    })
  );
}

function* closeAddUserDialog({ payload }: PayloadAction<any>) {
  const { onClose } = yield select((state) => state.auth.teamState.addUserDialogState);
  onClose?.(payload);
  yield put(
    actions.setTeamState({
      addUserDialogState: {
        loading: false,
        error: false,
        open: false,
      },
    })
  );
}

function* openDeleteUserDialog({ payload }: PayloadAction<ISetDeleteUserDialog | undefined>) {
  yield put(
    actions.setTeamState({
      deleteUserDialogState: {
        open: true,
        loading: false,
        error: false,
        ...payload,
      },
    })
  );
}

function* closeDeleteUserDialog({ payload }: PayloadAction<any>) {
  const { onClose } = yield select((state) => state.auth.teamState.deleteUserDialogState);
  onClose?.(payload);
  yield put(
    actions.setTeamState({
      deleteUserDialogState: {
        loading: false,
        error: false,
        open: false,
      },
    })
  );
}

export function* teamSagas() {
  yield takeEvery(actions.loadUsers, loadUsers);
  yield takeEvery(actions.addUser, addUser);
  yield takeEvery(actions.resendActivationLink, resendActivationLink);
  yield takeEvery(actions.sendResetPasswordLink, sendResetPasswordLink);
  yield takeEvery(actions.openAddUserDialog, openAddUserDialog);
  yield takeEvery(actions.closeAddUserDialog, closeAddUserDialog);
  yield takeEvery(actions.openDeleteUserDialog, openDeleteUserDialog);
  yield takeEvery(actions.closeDeleteUserDialog, closeDeleteUserDialog);
}
