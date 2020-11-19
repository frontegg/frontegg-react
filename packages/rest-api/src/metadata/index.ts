import { Get } from '../fetch';
import { IAuditsMetadata, IGetMetadata, INotificationMetadata, ISamlMetadata } from './interfaces';

async function getMetadata(body: IGetMetadata) {
  const data = await Get('/metadata', body);
  if (data?.rows?.[0]) return data?.rows?.[0];

  throw new Error(`metadata not found: ${body.entityName}`);
}

async function getIpMetadata(ip: string) {
  const data = await Get(`/metadata/ip/${ip}`);
  if (data) return data;

  throw new Error(`ip metadata not found`);
}

export const getNotificationsMetadata = async (): Promise<INotificationMetadata> =>
  getMetadata({ entityName: 'notifications' });
export const getSamlMetadata = async (): Promise<ISamlMetadata> => getMetadata({ entityName: 'saml' });

export const getAuditsMetadata = async (): Promise<IAuditsMetadata> => getMetadata({ entityName: 'audits' });

export const getIpAdressMetadata = async (ip: string): Promise<any> => getIpMetadata(ip);
