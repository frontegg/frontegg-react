import { ITeamUser } from '@frontegg/react-core';

export interface TeamState {
  loading: boolean;
  users: ITeamUser[];
}
