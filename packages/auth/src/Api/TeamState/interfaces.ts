import { ITeamUserRole, ITeamUser } from '@frontegg/react-core';

export interface TeamState {
  error?: string; // for general api errors
  loading: boolean; // for loading actions
  saving: boolean; // for post actions

  users: ITeamUser[];
  totalPages: number;
  roles: ITeamUserRole[];

  // users stats
  totalItems?: number;
  addedThisWeek?: number;
}
