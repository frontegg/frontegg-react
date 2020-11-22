import { Get } from '../fetch';
import { IGetMetadata, INotificationMetadata, ISamlMetadata } from './interfaces';

async function getMetadata(body: IGetMetadata) {
  const data = await Get('/metadata', body);
  if (data?.rows?.[0]) return data?.rows?.[0];

  throw new Error(`metadata not found: ${body.entityName}`);
}

export const getNotificationsMetadata = async (): Promise<INotificationMetadata> => getMetadata({ entityName: 'notifications' });
export const getSamlMetadata = async (): Promise<ISamlMetadata> => getMetadata({ entityName: 'saml' });

