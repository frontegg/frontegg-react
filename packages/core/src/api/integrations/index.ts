import { Logger } from '../../helpers';
import { EVENT_RESOURCES_URL_V1, INTEGRATIONS_SERVICE_URL_V1, INTEGRATIONS_SERVICE_WEBHOOKS_URL } from '../constants';
import { Get, Patch, Post } from '../fetch';
import { IEmailConfigurations, ISMSConfigurations, ISlackConfigurations } from './interfaces';

const logger = Logger.from('IntegrationsApi');

export const getSlackConfiguration = () => {
  logger.debug('getSlackConfiguration()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V1}/slack`);
};

export const getSlackChannels = () => {
  logger.debug('getSlackChannels()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V1}/slack/channels`);
};

export const postSlackConfiguration = (data: ISlackConfigurations) => {
  logger.debug('getSlackConfiguration()', data);
  if (data.id) {
    return Patch(`${INTEGRATIONS_SERVICE_URL_V1}/slack/subscriptions/${data.id}`, data);
  }
  return Post(`${INTEGRATIONS_SERVICE_URL_V1}/slack/subscriptions`, data);
};

export const getEmailConfiguration = () => {
  logger.debug('getEmailConfiguration()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V1}/email`);
};

export const postEmailConfiguration = (data: IEmailConfigurations) => {
  logger.debug('postEmailConfiguration()', data);
  return Post(`${INTEGRATIONS_SERVICE_URL_V1}/email`, data);
};

export const getSMSConfiguration = () => {
  logger.debug('getSMSConfiguration()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V1}/sms`);
};

export const postSMSConfiguration = (data: ISMSConfigurations) => {
  logger.debug('postSMSConfiguration()', data);
  return Post(`${INTEGRATIONS_SERVICE_URL_V1}/sms`, data);
};

export const getWebhooksConfigurations = () => {
  logger.debug('getWebhooksConfigurations()');
  return Get(INTEGRATIONS_SERVICE_WEBHOOKS_URL);
};

export const postWebhooksConfiguration = (data: ISMSConfigurations) => {
  logger.debug('postWebhooksConfiguration()', data);
  return Post(INTEGRATIONS_SERVICE_WEBHOOKS_URL, data);
};

export const getCategories = () => {
  logger.debug('getCategories()');
  return Get(`${EVENT_RESOURCES_URL_V1}/categories`);
};

export const getChannelMaps = (channels: string) => {
  logger.debug('getChannelMaps()', channels);
  return Get(EVENT_RESOURCES_URL_V1, { channels });
};
