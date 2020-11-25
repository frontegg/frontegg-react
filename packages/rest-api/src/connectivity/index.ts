import {
  EVENT_RESOURCES_URL_V1,
  CONNECTIVITY_SERVICE_URL_V1,
  CONNECTIVITY_SERVICE_URL_V2,
  CONNECTIVITY_SERVICE_WEBHOOKS_URL,
} from '../constants';
import { Get, Patch, Post, Delete, Put } from '../fetch';
import {
  IWebhookTest,
  IWebhooksSaveData,
  ISlackSubscription,
  IEmailSMSConfigResponse,
  IEmailSMSSubscriptionResponse,
} from './interfaces';

export const getSlackConfiguration = () => {
  console.debug('getSlackConfiguration()');
  return Get(`${CONNECTIVITY_SERVICE_URL_V1}/slack`);
};

export const getSlackScope = () => {
  console.debug('getSlackScope()');
  return Get(`${CONNECTIVITY_SERVICE_URL_V1}/slack/applications`);
};

export const getSlackChannels = () => {
  console.debug('getSlackChannels()');
  return Get(`${CONNECTIVITY_SERVICE_URL_V1}/slack/channels`);
};

export const postSlackConfiguration = (data: ISlackSubscription) => {
  console.debug('postSlackConfiguration()', data);
  if (data.id) {
    return Patch(`${CONNECTIVITY_SERVICE_URL_V1}/slack/subscription/${data.id}`, data);
  }
  return Post(`${CONNECTIVITY_SERVICE_URL_V1}/slack/subscriptions`, data);
};
export const deleteSlackConfiguration = (data: Required<ISlackSubscription>) => {
  console.debug('deleteSlackConfiguration()', data);
  return Delete(`${CONNECTIVITY_SERVICE_URL_V1}/slack/subscriptions/${data.id}`);
};

export const postSlackCode = (code: string) => {
  console.debug('postSlackCode()', { code });
  return Post(`${CONNECTIVITY_SERVICE_URL_V1}/slack//applications/registrations`, { code });
};

export const getEmailConfiguration = (): Promise<IEmailSMSConfigResponse[]> => {
  console.debug('getEmailConfiguration()');
  return Get(`${CONNECTIVITY_SERVICE_URL_V1}/emails`);
};

export const postEmailConfiguration = ({ eventKey, ...data }: IEmailSMSConfigResponse): Promise<null> => {
  console.debug('postEmailConfiguration()', { ...data, eventKey });
  return Post(`${CONNECTIVITY_SERVICE_URL_V1}/emails/${eventKey}`, data);
};

export const patchEmailConfiguration = ({
  eventKey,
  enabled,
}: Pick<IEmailSMSConfigResponse, 'eventKey' | 'enabled'>): Promise<null> => {
  console.debug('patchEmailConfiguration()', { eventKey, enabled });
  return Patch(`${CONNECTIVITY_SERVICE_URL_V1}/emails/${eventKey}`, { enabled });
};

export const deleteEmailSubscriptions = (eventKey: string, subscriptionId: string): Promise<null> => {
  console.debug('deleteEmailSubscriptions()', { eventKey, subscriptionId });
  return Delete(`${CONNECTIVITY_SERVICE_URL_V1}/emails/${eventKey}/subscriptions/${subscriptionId}`);
};

export const putEmailSubscriptions = (
  subscriptionId: string,
  eventKey: string,
  data: IEmailSMSSubscriptionResponse
): Promise<null> => {
  console.debug('putEmailSubscriptions()', { ...data, subscriptionId, eventKey });
  return Put(`${CONNECTIVITY_SERVICE_URL_V1}/emails/${eventKey}/subscriptions/${subscriptionId}`, data);
};

export const deleteEmailConfiguration = (eventKey: string): Promise<null> => {
  console.debug('deleteEmailConfiguration()', { eventKey });
  return Delete(`${CONNECTIVITY_SERVICE_URL_V1}/emails/${eventKey}`);
};

export const getSMSConfiguration = (): Promise<IEmailSMSConfigResponse[]> => {
  console.debug('getSMSConfiguration()');
  return Get(`${CONNECTIVITY_SERVICE_URL_V2}/sms`);
};

export const postSMSConfiguration = ({ eventKey, ...data }: IEmailSMSConfigResponse) => {
  console.debug('postSMSConfiguration()', { ...data, eventKey });
  return Post(`${CONNECTIVITY_SERVICE_URL_V2}/sms/${eventKey}`, data);
};

export const patchSMSConfiguration = ({
  eventKey,
  enabled,
}: Pick<IEmailSMSConfigResponse, 'eventKey' | 'enabled'>): Promise<null> => {
  console.debug('patchSMSConfiguration()', { eventKey, enabled });
  return Patch(`${CONNECTIVITY_SERVICE_URL_V2}/sma/${eventKey}`, { enabled });
};

export const deletesmsSubscriptions = (eventKey: string, subscriptionId: string): Promise<null> => {
  console.debug('deletesmsSubscriptions()', { eventKey, subscriptionId });
  return Delete(`${CONNECTIVITY_SERVICE_URL_V2}/sms/${eventKey}/subscriptions/${subscriptionId}`);
};

export const putSMSSubscriptions = (
  subscriptionId: string,
  eventKey: string,
  data: IEmailSMSSubscriptionResponse
): Promise<null> => {
  console.debug('putSMSSubscriptions()', { ...data, subscriptionId, eventKey });
  return Put(`${CONNECTIVITY_SERVICE_URL_V2}/sms/${eventKey}/subscriptions/${subscriptionId}`, data);
};

export const deleteSMSConfiguration = (eventKey: string): Promise<null> => {
  console.debug('deleteSMSConfiguration()', { eventKey });
  return Delete(`${CONNECTIVITY_SERVICE_URL_V2}/sms/${eventKey}`);
};

export const getWebhooksConfigurations = () => {
  console.debug('getWebhooksConfigurations()');
  return Get(CONNECTIVITY_SERVICE_WEBHOOKS_URL);
};

export const postWebhooksConfiguration = (data: IWebhooksSaveData) => {
  console.debug('postWebhooksConfiguration()', data);
  if (data._id) {
    return Patch(`${CONNECTIVITY_SERVICE_WEBHOOKS_URL}/${data._id}`, data);
  } else {
    return Post(CONNECTIVITY_SERVICE_WEBHOOKS_URL, data);
  }
};

export const deleteWebhooksConfiguration = (id: string): Promise<null> => {
  console.debug('deleteWebhooksConfiguration()', id);
  return Delete(`${CONNECTIVITY_SERVICE_WEBHOOKS_URL}/${id}`);
};

export const getWebhookLog = (id: string, offset: number = 0, limit: number = 10) => {
  console.debug('getWebhookLog()', id);
  const query = new URLSearchParams({ id, offset: `${offset}`, limit: `${limit}` });
  return Get(`${CONNECTIVITY_SERVICE_WEBHOOKS_URL}/logs/?${query.toString()}`);
};

export const postWebhookTest = (data: IWebhookTest) => {
  console.debug('postWebhookTest', data);
  return Post(`${CONNECTIVITY_SERVICE_WEBHOOKS_URL}/test`, data);
};

export const getCategories = () => {
  console.debug('getCategories()');
  return Get(`${EVENT_RESOURCES_URL_V1}/categories`);
};

export const getChannelMaps = (channels: string) => {
  console.debug('getChannelMaps()', channels);
  return Get(EVENT_RESOURCES_URL_V1, { channels });
};
