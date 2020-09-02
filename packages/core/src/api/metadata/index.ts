import ContextHolder from '../ContextHolder';
import { Get } from '../fetch';
import { IGetMetadata, INotificationMetadata, ISamlMetadata } from './interfaces';

async function getMetadata(body: IGetMetadata) {
  const context = ContextHolder.getInstance().getContext();
  const data = await Get(context, '/metadata', body);
  if (data?.rows?.[0])
    return data?.rows?.[0];

  throw new Error(`metadata not found: ${body.entityName}`);
}


export const getNotificationsMetadata = async (): Promise<INotificationMetadata> => getMetadata({ entityName: 'notifications' });
export const getSamlMetadata = async (): Promise<ISamlMetadata> => getMetadata({ entityName: 'saml' });
