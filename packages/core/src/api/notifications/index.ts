import { Get, Post, Put } from '../fetch';
import Logger from '../../helpers/Logger';
import { NOTIFICATIONS_SERVICE_URL } from '../constants';
import { ILoadMessages, IMessage, IUpdateNotificationStatus, IUpdateNotificationIsPinned } from './interfaces';

const logger = Logger.from('Notifications api');

/*****************************************
 * Notifications Api
 *****************************************/

/**
 * get Notifications
 */

export async function getNotifications(params: ILoadMessages): Promise<Array<IMessage>> {
  logger.debug('getNotifications()');
  return Get(`${NOTIFICATIONS_SERVICE_URL}`, { params });
}

/**
 * update Notification status
 */

export async function updateNotificationStatus(params: IUpdateNotificationStatus): Promise<void> {
  logger.debug('getNotifications()');
  return Put(`${NOTIFICATIONS_SERVICE_URL}/status`, { params });
}

/**
 * update Notification pin status
 */

export async function updateNotificationIsPinned(params: IUpdateNotificationIsPinned): Promise<void> {
  const { notificationId, pinStatus } = params;
  logger.debug('getNotifications()');
  return Put(`${NOTIFICATIONS_SERVICE_URL}/${pinStatus}`, { notificationId });
}

/**
 * mark all notifications as read
 */

export async function markAllAsRead(): Promise<void> {
  logger.debug('getNotifications()');
  return Post(`${NOTIFICATIONS_SERVICE_URL}/status/mark-all-read`);
}
