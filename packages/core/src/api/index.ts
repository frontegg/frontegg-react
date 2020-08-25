import * as auth from './auth';
import * as profile from './profile';
import * as metadata from './metadata';

export * from './auth/interfaces'
export * from './profile/interfaces'

export const api = {
  auth,
  profile,
  metadata
}
