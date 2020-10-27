import { Logger } from '../../helpers';
import { INTEGRATIONS_SERVICE_URL_V1, INTEGRATIONS_SERVICE_WEBHOOKS_URL } from '../constants';
import { Get, Post } from '../fetch';
import { IEmailConfigurations, ISMSConfigurations, ISubscription } from './interfaces';

const logger = Logger.from('IntegrationsApi');

export const getSlackConfiguration = () => {
  logger.debug('getSlackConfiguration()');
  return Get(`${INTEGRATIONS_SERVICE_URL_V1}/slack`);
};

export const postSlackConfiguration = (data: ISubscription) => {
  logger.debug('getSlackConfiguration()');
  return Post(`${INTEGRATIONS_SERVICE_URL_V1}/slack`);
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
  return Get(`${INTEGRATIONS_SERVICE_WEBHOOKS_URL}`);
};

export const postWebhooksConfiguration = (data: ISMSConfigurations) => {
  logger.debug('postWebhooksConfiguration()', data);
  return Post(`${INTEGRATIONS_SERVICE_WEBHOOKS_URL}`, data);
};
