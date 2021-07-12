import * as auth from './auth';
import * as teams from './teams';
import * as metadata from './metadata';
import * as reports from './reports';
import * as notifications from './notifications';
import * as audits from './audits';
import * as fetch from './fetch';
import * as connectivity from './connectivity';
import * as tenants from './tenants';
import * as accountSettings from './account-settings';
import * as roles from './roles';
import * as subscriptions from './subscriptions';

import { ContextHolder, FronteggContext } from './ContextHolder';

export * from './interfaces';
export * from './auth/interfaces';
export * from './teams/interfaces';
export * from './metadata/interfaces';
export * from './reports/interfaces';
export * from './connectivity/interfaces';
export * from './notifications/interfaces';
export * from './audits/interfaces';
export * from './tenants/interfaces';
export * from './account-settings/interfaces';
export * from './roles/interfaces';
export * from './subscriptions/interfaces';

const api = {
  auth,
  teams,
  metadata,
  reports,
  connectivity,
  notifications,
  audits,
  tenants,
  accountSettings,
  roles,
  subscriptions,
};

export { fetch, ContextHolder, FronteggContext, api };
