import { call, put, retry, select, takeEvery, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { api, IChangePassword, IUserProfile } from '@frontegg/rest-api';
import { PayloadAction } from '@reduxjs/toolkit';

function* loadProfile() {
  yield put(actions.setProfileState({ loading: true }));
  try {
    const profile = yield retry(3, 2000, api.teams.getProfile);
    const currentUser = yield select((state) => state.auth.user);
    actions.setUser({ ...currentUser, ...profile });
    yield put(actions.setProfileState({ profile, loading: false }));
  } catch (e) {
    yield put(actions.setProfileState({ loading: false, error: e.message }));
  }
}

function* saveProfile({ payload }: PayloadAction<Partial<IUserProfile>>) {
  yield put(actions.setProfileState({ saving: true }));
  try {
    const oldProfileData = yield select((state) => state.auth.profileState.profile);
    const newProfileData = {
      ...oldProfileData,
      ...payload,
    };
    const profile = yield call(api.teams.updateProfile, newProfileData);
    const currentUser = yield select((state) => state.auth.user);
    actions.setUser({ ...currentUser, ...profile });
    yield put(actions.setProfileState({ profile, saving: false }));
  } catch (e) {
    yield put(actions.setProfileState({ saving: false, error: e.message }));
  }
}

function* changePassword({ payload }: PayloadAction<IChangePassword>) {
  yield put(actions.setProfileState({ loading: true }));
  try {
    yield call(api.teams.changePassword, payload);
    yield put(actions.setProfileState({ loading: false, error: undefined }));
  } catch (e) {
    yield put(actions.setProfileState({ loading: false, error: e.message }));
  }
}

export function* profileSagas() {
  yield takeLeading(actions.loadProfile, loadProfile);
  yield takeEvery(actions.saveProfile, saveProfile);
  yield takeEvery(actions.changePassword, changePassword);
}
