import {
  EVENT_RESOURCES_URL_V1,
  INTEGRATIONS_SERVICE_URL_V1,
  INTEGRATIONS_SERVICE_URL_V2,
  INTEGRATIONS_SERVICE_WEBHOOKS_URL,
} from '../constants';
import { Get, Patch, Post, Delete, Put } from '../fetch';
import {
  IWebhookTest,
  IWebhooksSaveData,
  ISlackSubscription,
  IEmailConfigResponse,
  IEmailSubscriptionResponse,
} from './interfaces';

export const getSlackConfiguration = () => {
  console.debug('getSlackConfiguration()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V1}/slack`);
};

export const getSlackScope = () => {
  console.debug('getSlackConfiguration()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V1}/slack/applications`);
};

export const getSlackChannels = () => {
  console.debug('getSlackChannels()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V1}/slack/channels`);
};

export const postSlackConfiguration = (data: ISlackSubscription) => {
  console.debug('postSlackConfiguration()', data);
  if (data.id) {
    return Patch(`${INTEGRATIONS_SERVICE_URL_V1}/slack/subscription/${data.id}`, data);
  }
  return Post(`${INTEGRATIONS_SERVICE_URL_V1}/slack/subscriptions`, data);
};
export const deleteSlackConfiguration = (data: Required<ISlackSubscription>) => {
  console.debug('deleteSlackConfiguration()', data);
  return Delete(`${INTEGRATIONS_SERVICE_URL_V1}/slack/subscriptions/${data.id}`);
};

export const postSlackCode = (code: string) => {
  console.debug('deleteSlackConfiguration()', { code });
  return Post(`${INTEGRATIONS_SERVICE_URL_V1}/slack//applications/registrations`, { code });
};

export const getEmailConfiguration = (): Promise<IEmailConfigResponse[]> => {
  console.debug('getEmailConfiguration()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V1}/emails`);
};

export const postEmailConfiguration = ({ eventKey, ...data }: IEmailConfigResponse): Promise<null> => {
  console.debug('postEmailConfiguration()', { ...data, eventKey });
  return Post(`${INTEGRATIONS_SERVICE_URL_V1}/emails/${eventKey}`, data);
};

export const patchEmailConfiguration = ({
  eventKey,
  enabled,
}: Pick<IEmailConfigResponse, 'eventKey' | 'enabled'>): Promise<null> => {
  console.debug('patchEmailConfiguration()', { eventKey, enabled });
  return Patch(`${INTEGRATIONS_SERVICE_URL_V1}/emails/${eventKey}`, { enabled });
};

export const deleteEmailSubscriptions = (eventKey: string, subscriptionId: string): Promise<null> => {
  console.debug('deleteEmailSubscriptions()', { eventKey, subscriptionId });
  return Delete(`${INTEGRATIONS_SERVICE_URL_V1}/emails/${eventKey}/subscriptions/${subscriptionId}`);
};

export const putEmailSubscriptions = (
  subscriptionId: string,
  eventKey: string,
  data: IEmailSubscriptionResponse
): Promise<null> => {
  console.debug('putEmailSubscriptions()', { ...data, subscriptionId, eventKey });
  return Put(`${INTEGRATIONS_SERVICE_URL_V1}/emails/${eventKey}/subscriptions/${subscriptionId}`, data);
};

export const deleteEmailConfiguration = (eventKey: string): Promise<null> => {
  console.debug('pdeleteEmailConfigurationutEmailConfiguration()', { eventKey });
  return Delete(`${INTEGRATIONS_SERVICE_URL_V1}/emails/${eventKey}`);
};

export const getSMSConfiguration = (): Promise<IEmailConfigResponse[]> => {
  console.debug('getSMSConfiguration()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V2}/sms`);
};

export const postSMSConfiguration = (data: IEmailConfigResponse[]) => {
  console.debug('postSMSConfiguration()', data);
  return Post(`${INTEGRATIONS_SERVICE_URL_V2}/sms`, data);
};

export const getWebhooksConfigurations = () => {
  console.debug('getWebhooksConfigurations()');
  return Get(INTEGRATIONS_SERVICE_WEBHOOKS_URL);
};

export const postWebhooksConfiguration = (data: IWebhooksSaveData) => {
  console.debug('postWebhooksConfiguration()', data);
  if (data._id) {
    return Patch(`${INTEGRATIONS_SERVICE_WEBHOOKS_URL}/${data._id}`, data);
  } else {
    return Post(INTEGRATIONS_SERVICE_WEBHOOKS_URL, data);
  }
};

export const getWebhookLog = (id: string, offset: number = 0, limit: number = 10) => {
  console.debug('getWebhookLog()', id);
  const query = new URLSearchParams({ id, offset: `${offset}`, limit: `${limit}` });
  return Get(`${INTEGRATIONS_SERVICE_WEBHOOKS_URL}/logs/?${query.toString()}`);
};

export const postWebhookTest = (data: IWebhookTest) => {
  console.debug('postWebhookTest', data);
  return Post(`${INTEGRATIONS_SERVICE_WEBHOOKS_URL}/test`, data);
};

export const getCategories = () => {
  console.debug('getCategories()');
  return Get(`${EVENT_RESOURCES_URL_V1}/categories`);
};

export const getChannelMaps = (channels: string) => {
  console.debug('getChannelMaps()', channels);
  return Get(EVENT_RESOURCES_URL_V1, { channels });
};
