import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, retry, select, takeEvery, takeLeading } from 'redux-saga/effects';
import { api, IChangePassword, IUserProfile } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { WithCallback } from '../../interfaces';
import { userDemo, userProfileDemo, profileStateDemo } from '../dummy';
import { delay } from '../utils';

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

function b64toBlob(base64: string, contentType: string): Blob {
  const sliceSize = 512;
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    byteArrays.push(new Uint8Array(byteNumbers));
  }
  return new Blob(byteArrays, { type: contentType });
}

function base64ToFormData(base64: string, key: string = 'file'): FormData | null {
  const matchResult = base64.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
  if (matchResult == null) {
    return null;
  }

  // Get the content type of the image
  const contentType = `image/${matchResult[1]}`;
  // get the real base64 content of the file
  const data = matchResult[2];

  // Convert it to a blob to upload
  const blob = b64toBlob(data, contentType);

  // Create a FormData and append the file with "image" as parameter name
  const formDataToUpload = new FormData();
  formDataToUpload.append(key, new File([blob], key, { type: contentType }));
  return formDataToUpload;
}

function* saveProfile({
  payload: { callback, profilePictureUrl, ...payload },
}: PayloadAction<Partial<WithCallback<IUserProfile, IUserProfile>>>) {
  yield put(actions.setProfileState({ saving: true, error: null }));
  try {
    const oldProfileData = yield select((state) => state.auth.profileState.profile);

    let newProfilePictureUrl = oldProfileData.profilePictureUrl;
    if (profilePictureUrl !== oldProfileData.profilePictureUrl && profilePictureUrl) {
      const matchResult = (profilePictureUrl || '').match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
      if (matchResult) {
        const profileImage = base64ToFormData(profilePictureUrl, 'image');
        if (profileImage) {
          newProfilePictureUrl = yield call(api.teams.updateProfileImage, profileImage);
          const imageTimeStamp = Date.now().toString();
          const urlTemplate = new URL(newProfilePictureUrl);
          urlTemplate.searchParams.set('t', imageTimeStamp);
          newProfilePictureUrl = urlTemplate.href;
        }
      }
    }

    const newProfileData = {
      ...oldProfileData,
      ...payload,
      profilePictureUrl: newProfilePictureUrl,
    };

    const profile = yield call(api.teams.updateProfile, newProfileData);

    const currentUser = yield select((state) => state.auth.user);
    yield put(actions.setUser({ ...currentUser, ...profile }));
    yield put(actions.setProfileState({ profile, saving: false }));
    callback?.(newProfileData);
  } catch (e) {
    yield put(actions.setProfileState({ saving: false, error: e.message }));
    callback?.(null, e);
  }
}

function* changePassword({ payload }: PayloadAction<WithCallback<IChangePassword>>) {
  yield put(actions.setProfileState({ loading: true }));
  try {
    yield call(api.teams.changePassword, payload);
    yield put(actions.setProfileState({ loading: false, error: undefined }));
    payload.callback?.(true);
  } catch (e) {
    yield put(actions.setProfileState({ loading: false, error: e.message }));
    payload.callback?.(null, e);
  }
}

export function* profileSagas() {
  yield takeLeading(actions.loadProfile, loadProfile);
  yield takeEvery(actions.saveProfile, saveProfile);
  yield takeEvery(actions.changePassword, changePassword);
}

/*********************************
 *  Preview Sagas
 *********************************/

function* loadProfileMock() {
  yield put(actions.setProfileState({ loading: true }));
  yield delay();
  const currentUser = userDemo;
  actions.setUser({ ...currentUser, ...userProfileDemo });
  yield put(actions.setProfileState({ loading: false }));
}

function* saveProfileMock({
  payload: { callback, profilePictureUrl, ...payload },
}: PayloadAction<Partial<WithCallback<IUserProfile, IUserProfile>>>) {
  yield put(actions.setProfileState({ saving: true, error: null }));
  const oldProfileData = profileStateDemo;

  let newProfilePictureUrl = oldProfileData.profile!.profilePictureUrl;
  if (profilePictureUrl !== oldProfileData.profile!.profilePictureUrl && profilePictureUrl) {
    const matchResult = (profilePictureUrl || '').match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (matchResult) {
      newProfilePictureUrl = profilePictureUrl;
    }
  }
  const newProfileData = {
    ...oldProfileData.profile!,
    ...payload,
    profilePictureUrl: newProfilePictureUrl,
  };

  const currentUser = userDemo;
  yield delay();
  yield put(actions.setUser({ ...currentUser, ...newProfileData }));
  yield put(actions.setProfileState({ loading: false, error: null, saving: false, profile: newProfileData }));
  callback?.(newProfileData);
}

function* changePasswordMock({ payload }: PayloadAction<WithCallback<IChangePassword>>) {
  yield put(actions.setProfileState({ loading: true }));
  yield delay();
  yield put(actions.setProfileState({ loading: false, error: undefined }));
  payload.callback?.(true);
}

export function* profileSagasMock() {
  yield takeLeading(actions.loadProfile, loadProfileMock);
  yield takeEvery(actions.saveProfile, saveProfileMock);
  yield takeEvery(actions.changePassword, changePasswordMock);
}
