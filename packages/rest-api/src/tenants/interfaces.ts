export interface ISwitchTenant {
  tenantId: string;
}

export interface ITenantsResponse {
  id: string;
  name: string;
  deletedAt: null;
  metadata: any;
  tenantId: string;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
  address?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  currency?: string;
  logo?: string;
}
