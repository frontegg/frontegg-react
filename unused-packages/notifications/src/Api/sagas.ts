import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './reducer';
import { MessageId } from './interfaces';
import { IMessages, IMessage, INotificationMetadata, api } from '@frontegg/rest-api';

function* loadMessages() {}

function* loadMetadata() {
  try {
    const metadata = yield call(api.metadata.getNotificationsMetadata);
    if (metadata.rows.length === 0) {
      return;
    }
  } catch (error) {
    yield put(actions.setNotificationsError(error));
  }
}

function* updateMessageIsPinned({ payload }: PayloadAction<MessageId>) {
  const {
    notifications: { messages },
  } = yield select();
  const sendMessage = messages.data
    .filter(({ id }: IMessage) => id === payload)
    .map(({ id, isPinned }: IMessage) => ({
      endpoint: isPinned ? 'pin' : 'unpin',
      payload: { notificationId: id },
    }));
  const [message] = sendMessage;
  try {
    yield api.notifications.updateNotificationIsPinned({
      pinStatus: message.endpoint,
      notificationId: message.payload,
    });
  } catch (e) {
    console.log('updateMessageIsPinnedFunction error');
  }
}

function* markAllAsRead() {
  try {
    yield call(api.notifications.markAllAsRead);
  } catch (error) {
    console.log('markAllAsRead error');
  }
}

function* updateMessageStatus({ payload }: PayloadAction<MessageId>) {
  const {
    notifications: { messages },
  } = yield select();
  let sendMessage = messages.data
    .filter(({ id }: IMessage) => id === payload)
    .map(({ id, status }: IMessage) => ({ notificationId: id, status }));
  if (!sendMessage.length) {
    // if can't find elements in the state then we removed it
    sendMessage = { notificationId: payload, status: 'archived' };
  }
  try {
    yield api.notifications.updateNotificationStatus(sendMessage[0]);
  } catch (e) {
    console.log('updateMessageStatus error');
  }
}

export function* notificationsSagas() {
  yield takeEvery(actions.loadMessages, loadMessages);
  yield takeEvery(actions.loadMetadata, loadMetadata);
}
