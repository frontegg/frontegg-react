import { LoaderIndicatorState } from '../interfaces';
import { ITeamUserRole } from '@frontegg/rest-api';

export interface ApiTokensState {
  loaders: LoaderIndicatorState<ApiStateKeys>;
  searchValue: string;
  apiTokensDataTenant: Array<ITenantApiTokensData>;
  apiTokensDataUser: Array<IUserApiTokensData>;
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
  roles: Array<ITeamUserRole>;
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

export interface IUserApiTokensData extends IApiTokensData {}

export interface ITenantApiTokensData extends IApiTokensData {
  roleIds: Array<string>;
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
