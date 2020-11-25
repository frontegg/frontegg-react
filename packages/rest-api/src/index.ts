import * as auth from './auth';
import * as teams from './teams';
import * as metadata from './metadata';
import * as reports from './reports';
import * as notifications from './notifications';
import * as audits from './audits';
import * as fetch from './fetch';
import * as integrations from './integrations';
import * as tenants from './tenants';

import { ContextHolder, FronteggContext } from './ContextHolder';

export * from './interfaces';
export * from './auth/interfaces';
export * from './teams/interfaces';
export * from './metadata/interfaces';
export * from './reports/interfaces';
export * from './integrations/interfaces';
export * from './notifications/interfaces';
export * from './audits/interfaces';
export * from './tenants/interfaces';

const api = {
  auth,
  teams,
  metadata,
  reports,
  integrations,
  notifications,
  audits,
  tenants,
};

export { fetch, ContextHolder, FronteggContext, api };
