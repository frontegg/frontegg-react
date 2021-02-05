import { UserApiTokensPage } from './UserApiTokens/UserApiTokensPage';
import { TenantApiTokensPage } from './TenantApiTokens/TenantApiTokensPage';
import { ApiTokensHeader } from './components/ApiTokensHeader';
import { ApiTokensLayout } from './components/ApiTokensLayout';
import { ApiTokensAddDialog } from './components/ApiTokensAddDialog';
import { ApiTokensSucceessDialog } from './components/ApiTokensSuccessDialog';
import { ApiTokensDeleteDialog } from './components/ApiTokensDeleteDialog';
import { ApiTokensTableToolbar } from './components/ApiTokensTableToolbar';
import { ApiTokensTableComponent } from './components/ApiTokensTableComponent';

export * from './UserApiTokens/UserApiTokensPage';
export * from './TenantApiTokens/TenantApiTokensPage';
export * from './hooks';

export const TenantApiTokens = {
  Page: TenantApiTokensPage,
  Header: ApiTokensHeader,
  Layout: ApiTokensLayout,
  Toolbar: ApiTokensTableToolbar,
  Table: ApiTokensTableComponent,
  AddDialog: ApiTokensAddDialog,
  SuccessDialog: ApiTokensSucceessDialog,
  DeleteDialog: ApiTokensDeleteDialog,
};

export const UserApiTokens = {
  Page: UserApiTokensPage,
  Header: ApiTokensHeader,
  Layout: ApiTokensLayout,
  Toolbar: ApiTokensTableToolbar,
  Table: ApiTokensTableComponent,
  AddDialog: ApiTokensAddDialog,
  SuccessDialog: ApiTokensSucceessDialog,
  DeleteDialog: ApiTokensDeleteDialog,
};
