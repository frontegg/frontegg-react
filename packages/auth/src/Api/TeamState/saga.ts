import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { actions } from '../reducer';
import {
  api,
  IAddUser,
  IDeleteUser,
  ILoadUsers,
  IResendActivationLink,
  ITeamUser,
  IUpdateUser,
} from '@frontegg/react-core';
import { PayloadAction } from '@reduxjs/toolkit';
import { WithCallback, WithSilentLoad } from '../interfaces';
import { ISetAddUserDialog, ISetDeleteUserDialog, TeamStateKeys } from './interfaces';

function* loadUsers({ payload }: PayloadAction<WithSilentLoad<ILoadUsers>>): any {
  const { silentLoading } = payload;
  const state = yield select((state) => state.auth.teamState);

  const pageSize = payload.pageSize ?? state.pageSize;
  const pageOffset = payload.pageSize ?? state.pageOffset;
  const filter = payload.filter ?? state.filter;
  const sort = payload.sort ?? state.sort;

  yield put(actions.setTeamLoader({ key: TeamStateKeys.USERS, value: !silentLoading }));
  yield put(
    actions.setTeamState({
      pageSize,
      pageOffset,
      filter,
      sort,
    })
  );
  try {
    const [{ items: users, totalPages }, { items: roles }] = yield all([
      call(api.teams.loadUsers, {
        pageSize,
        pageOffset,
        filter,
        sort,
      }),
      call(api.teams.loadAvailableRoles),
    ]);
    yield put(actions.setTeamState({ users, totalPages, roles }));
  } catch (e) {
    yield put(actions.setTeamError({ key: TeamStateKeys.USERS, value: e.message }));
    yield put(actions.setTeamState({ totalPages: 0, users: [] }));
  }
  yield put(actions.setTeamLoader({ key: TeamStateKeys.USERS, value: false }));
}

// function* loadStats() {
//   yield put(actions.setTeamLoader({ key: TeamStateKeys.STATS, value: true }));
//
//   try {
//     const stats = yield call(api.teams.loadStats);
//
//   } catch (e) {
//     yield put(actions.setTeamError({ key: TeamStateKeys.STATS, value: e.message }));
//   }
//
//   yield put(actions.setTeamLoader({ key: TeamStateKeys.STATS, value: false }));
// }

function* addUser({ payload }: PayloadAction<WithCallback<IAddUser, ITeamUser>>) {
  const { callback, ...body } = payload;
  const teamState = yield select((state) => state.auth.teamState);
  yield put(actions.setTeamState({ addUserDialogState: { ...teamState.addUserDialogState, loading: true } }));
  try {
    const { item: newUser } = yield call(api.teams.addUser, body);
    callback?.(newUser);
    yield put(
      actions.setTeamState({
        users: [newUser, ...teamState.users],
        addUserDialogState: { open: false, loading: false },
      })
    );
  } catch (e) {
    yield put(
      actions.setTeamState({
        addUserDialogState: { ...teamState.addUserDialogState, loading: false, error: e.message },
      })
    );
    callback?.(null, e.message);
  }
}

function* updateUser({ payload }: PayloadAction<WithCallback<IUpdateUser, ITeamUser>>) {
  const { callback, ...body } = payload;
  const { id: userId } = body;
  const teamState = yield select((state) => state.auth.teamState);
  yield put(actions.setTeamLoader({ key: TeamStateKeys.UPDATE_USER, value: userId || '' }));
  yield put(actions.setTeamState({ addUserDialogState: { ...teamState.addUserDialogState, loading: true } }));
  try {
    const { item: newUser } = yield call(api.teams.updateUser, body);
    callback?.(newUser);
    yield put(
      actions.setTeamState({
        users: teamState.users.map((user: ITeamUser) => (user.id === newUser.id ? newUser : user)),
      })
    );
    yield put(actions.setTeamLoader({ key: TeamStateKeys.UPDATE_USER, value: false }));
  } catch (e) {
    yield put(
      actions.setTeamState({
        addUserDialogState: { ...teamState.addUserDialogState, loading: false, error: e.message },
      })
    );
    yield put(actions.setTeamLoader({ key: TeamStateKeys.UPDATE_USER, value: false }));
    callback?.(null, e.message);
  }
}

function* deleteUser({ payload }: PayloadAction<WithCallback<IDeleteUser, boolean>>) {
  const { callback, ...body } = payload;
  const teamState = yield select((state) => state.auth.teamState);
  yield put(actions.setTeamState({ deleteUserDialogState: { ...teamState.deleteUserDialogState, loading: true } }));
  try {
    yield call(api.teams.deleteUser, body);
    callback?.(true);
    yield put(
      actions.setTeamState({
        users: teamState.users.filter((user: ITeamUser) => user.id !== body.userId),
        deleteUserDialogState: { open: false, loading: false },
      })
    );
  } catch (e) {
    yield put(
      actions.setTeamState({
        deleteUserDialogState: { ...teamState.deleteUserDialogState, loading: false, error: e.message },
      })
    );
    callback?.(null, e.message);
  }
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
  yield takeEvery(actions.updateUser, updateUser);
  yield takeEvery(actions.deleteUser, deleteUser);
  yield takeEvery(actions.resendActivationLink, resendActivationLink);
  yield takeEvery(actions.openAddUserDialog, openAddUserDialog);
  yield takeEvery(actions.closeAddUserDialog, closeAddUserDialog);
  yield takeEvery(actions.openDeleteUserDialog, openDeleteUserDialog);
  yield takeEvery(actions.closeDeleteUserDialog, closeDeleteUserDialog);
}
