import { ITenantsResponse } from '@frontegg/rest-api';

export interface TenantsState {
  tenants: ITenantsResponse[];
  loading: boolean;
  error?: any;
}
