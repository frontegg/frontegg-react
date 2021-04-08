import { AuditRowData, IAudits } from '@frontegg/rest-api';

const randomAction = () => {
  const random = Math.floor(Math.random() * 6);
  switch (random) {
    case 0:
      return {
        action: 'Updated profile',
        description: 'User updated profile details',
        severity: 'Info',
      };
    case 1:
      return {
        action: 'User logged in',
        severity: 'Info',
        description: 'User logged in to the product',
      };
    case 2:
      return {
        action: 'User failed to login',
        severity: 'High',
        description: 'User failed to login with password',
      };
    case 3:
      return {
        action: 'Added user',
        severity: 'Info',
        description: 'Added user david+535@frontegg.com to tenant',
      };
    case 4:
      return {
        action: 'Assigned roles',
        severity: 'Info',
        description: 'Assigned 0 roles for user',
      };

    case 5:
      return {
        action: 'Removed user david+108@frontegg.com from account',
        severity: 'Info',
        description: 'Removed access from the account for user david+108@frontegg.com',
      };
  }
};

export const auditLogsDataDemo: { data: any[]; total: number } = {
  total: 20,
  data: Array.from(Array(10).keys()).map((i) => ({
    ip: '198.143.51.1',
    email: 'user@frontegg.com',
    ...randomAction(),
    json: { key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4' },
    tenantId: 'my-tenant-id',
    vendorId: 'my-vendor-id',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
    createdAt: `2021-04-07 10:${50 - i}:40.201`,
  })),
};
export const auditLogsMetadataDemo: any = {
  properties: [
    {
      showInTable: true,
      name: 'createdAt',
      displayName: 'Time',
      type: 'Timestamp',
      sortable: true,
      filterable: true,
      showInMoreInfo: 'Always',
      chosen: false,
      selected: false,
      isPredefined: false,
    },
    {
      showInTable: true,
      name: 'email',
      displayName: 'User',
      type: 'Email',
      filterable: true,
      sortable: true,
      isPredefined: true,
      chosen: false,
      selected: false,
    },
    {
      showInTable: true,
      name: 'action',
      displayName: 'Action',
      type: 'AlphaNumeric',
      sortable: true,
      filterable: true,
      showInMoreInfo: 'Always',
      chosen: false,
      selected: false,
      isPredefined: true,
    },
    {
      showInTable: true,
      name: 'description',
      type: 'AlphaNumeric',
      sortable: false,
      filterable: false,
      displayName: 'Description',
      isPredefined: true,
      chosen: false,
      selected: false,
    },
    {
      showInTable: true,
      name: 'ip',
      displayName: 'IP Address',
      type: 'IpAddress',
      sortable: true,
      filterable: true,
      showInMoreInfo: 'Always',
      chosen: false,
      selected: false,
      isPredefined: true,
    },
    {
      showInTable: false,
      name: 'severity',
      displayName: 'Severity',
      type: 'Severity',
      sortable: true,
      filterable: true,
      showInMoreInfo: 'Always',
      chosen: false,
      selected: false,
      isPredefined: true,
    },
    {
      showInTable: false,
      name: 'userAgent',
      displayName: 'User Agent',
      type: 'AlphaNumeric',
      filterable: true,
      sortable: true,
      isPredefined: true,
      chosen: false,
      selected: false,
    },
    {
      showInTable: false,
      name: 'json',
      type: 'Json',
      sortable: true,
      filterable: true,
      displayName: 'Json Data',
      showInMoreInfo: 'Always',
      isPredefined: false,
    },
  ],
};
