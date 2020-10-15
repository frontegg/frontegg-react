import * as auth from './auth';
import * as teams from './teams';
import * as metadata from './metadata';
import * as reports from './reports';
import * as fetch from './fetch';

import { ContextHolder, FronteggContext } from './ContextHolder';

export * from './auth/interfaces';
export * from './teams/interfaces';
export * from './metadata/interfaces';
export * from './reports/interfaces';

const api = {
  auth,
  teams,
  metadata,
  reports,
};

export { fetch, ContextHolder, FronteggContext, api };
