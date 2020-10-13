import { ITeamUserRole, ITeamUser } from '@frontegg/react-core';
import { LoaderIndicatorState } from '../interfaces';

export enum TeamStateKeys {
  USERS = 'USERS',
  ADD_USER = 'ADD_USER',
  SAVE_USER = 'SAVE_USER',
  DELETE_USER = 'DELETE_USER',
  RESEND_ACTIVATE_LINK = 'RESEND_ACTIVATE_LINK',
  SEND_RESET_PASSWORD_LINK = 'SEND_RESET_PASSWORD_LINK',
}

export type TeamStateIndicator = {
  key: TeamStateKeys;
  value: string | boolean;
};

export interface TeamState {
  loaders: LoaderIndicatorState<TeamStateKeys>;
  errors: LoaderIndicatorState<TeamStateKeys>;

  users: ITeamUser[];
  pageSize: number;
  totalPages: number;
  roles: ITeamUserRole[];

  // users stats
  totalItems?: number;
  addedThisWeek?: number;
}
