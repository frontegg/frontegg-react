import { EVENT_RESOURCES_URL_V1, INTEGRATIONS_SERVICE_URL_V1, INTEGRATIONS_SERVICE_WEBHOOKS_URL } from '../constants';
import { Get, Patch, Post, Delete } from '../fetch';
import { IEmailConfigurations, ISMSConfigurations, ISlackSubscription, IWebhooksSaveData } from './interfaces';

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

export const getEmailConfiguration = () => {
  console.debug('getEmailConfiguration()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V1}/email`);
};

export const postEmailConfiguration = (data: IEmailConfigurations) => {
  console.debug('postEmailConfiguration()', data);
  return Post(`${INTEGRATIONS_SERVICE_URL_V1}/email`, data);
};

export const getSMSConfiguration = () => {
  console.debug('getSMSConfiguration()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V1}/sms`);
};

export const postSMSConfiguration = (data: ISMSConfigurations) => {
  console.debug('postSMSConfiguration()', data);
  return Post(`${INTEGRATIONS_SERVICE_URL_V1}/sms`, data);
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

export const getCategories = () => {
  console.debug('getCategories()');
  return Get(`${EVENT_RESOURCES_URL_V1}/categories`);
};

export const getChannelMaps = (channels: string) => {
  console.debug('getChannelMaps()', channels);
  return Get(EVENT_RESOURCES_URL_V1, { channels });
};
