export type IGetMetadata = Pick<IBaseMetadata, 'entityName'>

interface IBaseMetadata {
  entityName: 'saml' | 'notifications'
  id: string;
  createdAt: string;
  updatedAt: string;
  properties: any[];
  vendorId: string;
}

export type IMetadataTheme = {
  id: string;
  name: string;
  styles: any;
}

export interface INotificationMetadata extends IBaseMetadata {
  entityName: 'notifications';
  channels: string[];
  channelsConfig: string[];
  severities: any[];
  theme: IMetadataTheme;
}

export interface ISamlMetadata extends IBaseMetadata {
  entityName: 'saml';
  configuration: {
    acsUrl: string;
    spEntityId: string;
  }
}
