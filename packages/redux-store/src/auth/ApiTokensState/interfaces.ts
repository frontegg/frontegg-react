import { ITeamUserRole } from '@frontegg/rest-api';
import { LoaderIndicatorState, WithCallback } from '../../interfaces';

export interface ApiTokensState {
  loaders: LoaderIndicatorState<ApiStateKeys>;
  searchValue: string;
  apiTokensDataTenant: ITenantApiTokensData[];
  apiTokensDataUser: IApiTokensData[];
  showAddTokenDialog: boolean;
  createdByUserIdColumn?: createdByUserIdColumn;
  deleteTokenDialog: {
    open: boolean;
    clientId: string;
  };
  successDialog: {
    open: boolean;
    secret?: string;
    clientId?: string;
  };
  apiTokenType: ApiTokenType;
  roles: ITeamUserRole[];
  errors?: any;
}

export type ApiTokenType = 'user' | 'tenant' | null;
export type createdByUserIdColumn = 'show' | 'hide' | undefined;

export interface IApiTokensData {
  clientId: string;
  createdAt: string;
  secret: string;
  description: string;
}

export type IUserApiTokensData = IApiTokensData

export interface ITenantApiTokensData extends IApiTokensData {
  roleIds: string[];
  tenantId: string;
  createdByUserId: string;
}

export type ApiStateIndicator = {
  key: ApiStateKeys;
  value: string | boolean;
};

export enum ApiStateKeys {
  LOAD_API_TOKENS = 'LOAD_API_TOKENS',
  ADD_API_TOKEN = 'ADD_API_TOKEN',
  DELETE_API_TOKEN = 'DELETE_API_TOKEN',
}

export type AddTenantApiTokenPayload = WithCallback<Pick<ITenantApiTokensData, 'description' | 'roleIds'>>
export type AddUserApiTokenPayload = WithCallback<Pick<IApiTokensData, 'description'>>
