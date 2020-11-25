export type IGetMetadata = Pick<IBaseMetadata, 'entityName'>;

interface IBaseMetadata {
  entityName: 'saml' | 'notifications' | 'audits';
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
};

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
  };
}

export interface IAuditsMetadata extends IBaseMetadata {
  entityName: 'audits';
  theme: IMetadataTheme;
}

export interface IMetadataIp {
  latitude: number;
  longitude: number;
  city: string | null;
  country_name: string | null;
  country_code: string | null;
  zip: string | null;
  location: {
    country_flag?: string | null;
    country_flag_emoji?: string | null;
  };
}
