import { ITeamUserRole, ITeamUser, QuerySort, QueryFilter, ITeamUserPermission } from '@frontegg/rest-api';
import { LoaderIndicatorState, WithCallback } from '../../interfaces';

export enum TeamStateKeys {
  USERS = 'USERS',
  STATS = 'STATS',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
  RESEND_ACTIVATE_LINK = 'RESEND_ACTIVATE_LINK',
  ROLES_AND_PERMISSIONS = 'ROLES_AND_PERMISSIONS',
}

export type TeamStateIndicator = {
  key: TeamStateKeys;
  value: string | boolean;
};

type BaseDialogState = {
  open: boolean;
  onClose?: (data?: any) => void;
};
export type AddUserDialogState = BaseDialogState & {
  loading?: boolean;
  error?: boolean;
};
export type ISetAddUserDialog = Omit<AddUserDialogState, 'loading' | 'error' | 'open'>;

export type DeleteUserDialogState = BaseDialogState & {
  loading?: boolean;
  error?: boolean;
  userId?: string;
  email?: string;
};
export type ISetDeleteUserDialog = Omit<DeleteUserDialogState, 'loading' | 'error' | 'open'>;

export type LoadRolesAndPermissionsPayload = WithCallback<
  {},
  { roles: ITeamUserRole[]; permissions: ITeamUserPermission[] }
>;

export interface TeamState {
  loaders: LoaderIndicatorState<TeamStateKeys>;
  errors: LoaderIndicatorState<TeamStateKeys>;

  users: ITeamUser[];
  pageOffset: number;
  pageSize: number;
  totalPages: number;
  roles: ITeamUserRole[];
  permissions: ITeamUserPermission[];

  filter: QueryFilter[];
  sort: QuerySort[];

  // users stats
  totalItems?: number;
  addedThisWeek?: number;

  // dialogs
  addUserDialogState: AddUserDialogState;
  deleteUserDialogState: DeleteUserDialogState;
}