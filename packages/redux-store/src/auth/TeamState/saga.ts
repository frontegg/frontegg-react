import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put, call, all, takeEvery, select as sagaSelect } from 'redux-saga/effects';
import {
  api,
  IAddUser,
  IDeleteUser,
  ILoadUsers,
  IResendActivationLink,
  IResendInvitationLink,
  IRole,
  ITeamUser,
  IUpdateUser,
} from '@frontegg/rest-api';
import { actions } from '../reducer';
import { WithCallback, WithSilentLoad } from '../../interfaces';
import {
  ISetAddUserDialog,
  ISetDeleteUserDialog,
  LoadRolesAndPermissionsPayload,
  TeamState,
  TeamStateKeys,
} from './interfaces';
import { authStoreName } from '../../constants';
import { delay } from '../utils';
import { permissionsDemo, rolesDemo, usersDemo, userTeamDemo } from '../dummy';
import { v4 as uuid } from 'uuid';

const select = () => sagaSelect((_) => _[authStoreName].teamState);

function* loadUsers({ payload }: PayloadAction<WithCallback<WithSilentLoad<ILoadUsers>, ITeamUser[]>>): any {
  const { silentLoading, callback } = payload;
  const state = yield select();

  const pageSize = payload.pageSize ?? state.pageSize;
  const pageOffset = payload.pageOffset ?? state.pageOffset;
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
    const [{ items: users, totalPages, totalItems }, { items: roles }, { items: permissions }] = yield all([
      call(api.teams.loadUsers, {
        pageSize,
        pageOffset,
        filter,
        sort,
      }),
      call(api.teams.loadAvailableRoles),
      call(api.teams.loadAvailablePermissions),
    ]);
    yield put(actions.setTeamState({ users, totalPages, totalItems, roles, permissions }));
    callback?.(users);
  } catch (e) {
    yield put(actions.setTeamError({ key: TeamStateKeys.USERS, value: e.message }));
    yield put(actions.setTeamState({ totalPages: 0, users: [] }));
    callback?.(null, e);
  }
  yield put(actions.setTeamLoader({ key: TeamStateKeys.USERS, value: false }));
}

function* loadRoles({ payload }: PayloadAction<LoadRolesAndPermissionsPayload>) {
  yield put(actions.setTeamLoader({ key: TeamStateKeys.ROLES_AND_PERMISSIONS, value: true }));
  try {
    const [{ items: roles }, { items: permissions }] = yield all([
      call(api.teams.loadAvailableRoles),
      call(api.teams.loadAvailablePermissions),
    ]);

    yield put(actions.setTeamState({ roles, permissions }));
    payload?.callback?.({ roles, permissions });
  } catch (e) {
    payload?.callback?.(null, e);
    yield put(actions.setTeamError({ key: TeamStateKeys.ROLES_AND_PERMISSIONS, value: e.message }));
  }

  yield put(actions.setTeamLoader({ key: TeamStateKeys.ROLES_AND_PERMISSIONS, value: true }));
}

function* addUser({ payload }: PayloadAction<WithCallback<IAddUser, ITeamUser>>) {
  const { callback, ...body } = payload;
  const teamState = yield select();
  yield put(actions.setTeamState({ addUserDialogState: { ...teamState.addUserDialogState, loading: true } }));
  try {
    const res = yield call(api.teams.addUser, body);
    const { roles, ...userWithoutRoleIds } = res;
    const roleIds = roles.map((role: IRole) => role.id);
    const newUser = { ...userWithoutRoleIds, roleIds };

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
  const { callback, profileImage, ...body } = payload;
  const { id: userId } = body;
  const teamState = yield select();
  const oldUserData = teamState.users.find((user: ITeamUser) => user.id === body.id);
  yield put(actions.setTeamLoader({ key: TeamStateKeys.UPDATE_USER, value: userId || '' }));
  yield put(actions.setTeamState({ addUserDialogState: { ...teamState.addUserDialogState, loading: true } }));
  yield put(
    actions.setTeamState({
      addUserDialogState: { ...teamState.addUserDialogState, loading: true },
      users: teamState.users.map((user: ITeamUser) => {
        if (user.id === body.id) {
          return { ...user, ...body };
        }
        return user;
      }),
    })
  );
  try {
    if (oldUserData.roleIds.length > 0 && body.roleIds?.length === 0) {
      body.roleIds = [''];
    }
    const { item: newUser } = yield call(api.teams.updateUser, body);
    callback?.(newUser);
    yield put(
      actions.setTeamState({
        users: teamState.users.map((user: ITeamUser) =>
          user.id === newUser.id
            ? {
                ...user,
                ...newUser,
                createdAt: user.createdAt,
                customData: user.customData,
                lastLogin: user.lastLogin,
              }
            : user
        ),
      })
    );
    yield put(actions.setTeamLoader({ key: TeamStateKeys.UPDATE_USER, value: false }));
  } catch (e) {
    yield put(
      actions.setTeamState({
        addUserDialogState: { ...teamState.addUserDialogState, loading: false, error: e.message },
        users: teamState.users.map((user: ITeamUser) => (user.id === body.id ? { ...user, ...oldUserData } : user)),
      })
    );
    yield put(actions.setTeamLoader({ key: TeamStateKeys.UPDATE_USER, value: false }));
    callback?.(null, e.message);
  }
}

function* deleteUser({ payload }: PayloadAction<WithCallback<IDeleteUser>>) {
  const { callback, ...body } = payload;
  const teamState = yield select();
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

function* resendInvitationLink({ payload }: PayloadAction<WithCallback<IResendInvitationLink, boolean>>) {
  const { callback, ...body } = payload;
  yield put(actions.setTeamLoader({ key: TeamStateKeys.RESEND_INVITATION_LINK, value: body.userId }));
  try {
    yield call(api.teams.resendInvitationLink, body);
    callback?.(true);
  } catch (e) {
    yield put(actions.setTeamError({ key: TeamStateKeys.RESEND_INVITATION_LINK, value: e.message }));
    callback?.(null, e.message);
  }
  yield put(actions.setTeamLoader({ key: TeamStateKeys.RESEND_INVITATION_LINK, value: false }));
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
  const {
    addUserDialogState: { onClose },
  } = yield select();
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
  const {
    deleteUserDialogState: { onClose },
  } = yield select();
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
  yield takeLatest(actions.loadUsers, loadUsers);
  yield takeLatest(actions.loadRoles, loadRoles);
  yield takeEvery(actions.addUser, addUser);
  yield takeEvery(actions.updateUser, updateUser);
  yield takeEvery(actions.deleteUser, deleteUser);
  yield takeEvery(actions.resendActivationLink, resendActivationLink);
  yield takeEvery(actions.resendInvitationLink, resendInvitationLink);
  yield takeEvery(actions.openAddUserDialog, openAddUserDialog);
  yield takeEvery(actions.closeAddUserDialog, closeAddUserDialog);
  yield takeEvery(actions.openDeleteUserDialog, openDeleteUserDialog);
  yield takeEvery(actions.closeDeleteUserDialog, closeDeleteUserDialog);
}

/*********************************
 *  Preview Sagas
 *********************************/

function* loadUsersMock({ payload }: PayloadAction<WithCallback<WithSilentLoad<ILoadUsers>, ITeamUser[]>>): any {
  const { silentLoading, callback } = payload;
  const state = yield select();

  const pageSize = payload.pageSize ?? state.pageSize;
  const pageOffset = payload.pageOffset ?? state.pageOffset;
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
  const totalPages = 2;
  const totalItems = 10;
  yield delay();
  yield put(
    actions.setTeamState({ users: usersDemo, totalPages, totalItems, roles: rolesDemo, permissions: permissionsDemo })
  );
  yield put(actions.setTeamLoader({ key: TeamStateKeys.USERS, value: false }));
  callback?.(usersDemo);
}

function* loadRolesMock({ payload }: PayloadAction<LoadRolesAndPermissionsPayload>) {
  yield put(actions.setTeamLoader({ key: TeamStateKeys.ROLES_AND_PERMISSIONS, value: true }));
  yield delay();
  yield put(actions.setTeamState({ roles: rolesDemo, permissions: permissionsDemo }));
  yield put(actions.setTeamLoader({ key: TeamStateKeys.ROLES_AND_PERMISSIONS, value: true }));
  payload?.callback?.({ roles: rolesDemo, permissions: permissionsDemo });
}

function* addUserMock({ payload }: PayloadAction<WithCallback<IAddUser, ITeamUser>>) {
  const { callback, ...body } = payload;
  const teamState: TeamState = yield select();
  yield put(actions.setTeamState({ addUserDialogState: { ...teamState.addUserDialogState, loading: true } }));
  yield delay();
  const newUser: ITeamUser = { ...userTeamDemo, ...body, id: `${uuid()}` };
  callback?.(newUser);
  yield put(
    actions.setTeamState({
      users: [newUser, ...teamState.users],
      addUserDialogState: { open: false, loading: false },
    })
  );
}

function* updateUserMock({ payload }: PayloadAction<WithCallback<IUpdateUser, ITeamUser>>) {
  const { callback, profileImage, ...body } = payload;
  const { id: userId } = body;
  const teamState: TeamState = yield select();
  const oldUserData = teamState.users.find((user: ITeamUser) => user.id === body.id);
  yield put(actions.setTeamLoader({ key: TeamStateKeys.UPDATE_USER, value: userId || '' }));
  yield put(actions.setTeamState({ addUserDialogState: { ...teamState.addUserDialogState, loading: true } }));
  yield put(
    actions.setTeamState({
      addUserDialogState: { ...teamState.addUserDialogState, loading: true },
      users: teamState.users.map((user: ITeamUser) => {
        if (user.id === body.id) {
          return { ...user, ...body };
        }
        return user;
      }),
    })
  );
  if (oldUserData!.roleIds.length > 0 && body.roleIds?.length === 0) {
    body.roleIds = [''];
  }
  yield delay();
  const newUser: ITeamUser = { ...oldUserData!, ...body };
  callback?.(newUser);
  yield put(
    actions.setTeamState({
      users: teamState.users.map((user: ITeamUser) =>
        user.id === newUser.id
          ? {
              ...user,
              ...newUser,
              createdAt: user.createdAt,
              customData: user.customData,
              lastLogin: user.lastLogin,
            }
          : user
      ),
    })
  );
  yield put(actions.setTeamLoader({ key: TeamStateKeys.UPDATE_USER, value: false }));
}

function* deleteUserMock({ payload }: PayloadAction<WithCallback<IDeleteUser>>) {
  const { callback, ...body } = payload;
  const teamState: TeamState = yield select();
  yield put(actions.setTeamState({ deleteUserDialogState: { ...teamState.deleteUserDialogState, loading: true } }));
  yield delay();
  callback?.(true);
  yield put(
    actions.setTeamState({
      users: teamState.users.filter((user: ITeamUser) => user.id !== body.userId),
      deleteUserDialogState: { open: false, loading: false },
    })
  );
}

function* resendActivationLinkMock({ payload }: PayloadAction<WithCallback<IResendActivationLink, boolean>>) {
  const { callback, ...body } = payload;
  yield put(actions.setTeamLoader({ key: TeamStateKeys.RESEND_ACTIVATE_LINK, value: body.userId }));
  yield delay();
  callback?.(true);
  yield put(actions.setTeamLoader({ key: TeamStateKeys.RESEND_ACTIVATE_LINK, value: false }));
}

function* resendInvitationLinkMock({ payload }: PayloadAction<WithCallback<IResendInvitationLink, boolean>>) {
  const { callback, ...body } = payload;
  yield put(actions.setTeamLoader({ key: TeamStateKeys.RESEND_INVITATION_LINK, value: body.userId }));
  yield delay();
  callback?.(true);
  yield put(actions.setTeamLoader({ key: TeamStateKeys.RESEND_INVITATION_LINK, value: false }));
}

export function* teamSagasMock() {
  yield takeLatest(actions.loadUsers, loadUsersMock);
  yield takeLatest(actions.loadRoles, loadRolesMock);
  yield takeEvery(actions.addUser, addUserMock);
  yield takeEvery(actions.updateUser, updateUserMock);
  yield takeEvery(actions.deleteUser, deleteUserMock);
  yield takeEvery(actions.resendActivationLink, resendActivationLinkMock);
  yield takeEvery(actions.resendInvitationLink, resendInvitationLinkMock);
  yield takeEvery(actions.openAddUserDialog, openAddUserDialog);
  yield takeEvery(actions.closeAddUserDialog, closeAddUserDialog);
  yield takeEvery(actions.openDeleteUserDialog, openDeleteUserDialog);
  yield takeEvery(actions.closeDeleteUserDialog, closeDeleteUserDialog);
}
