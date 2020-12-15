import { UserApiTokensPage } from './UserApiTokens';
import { TenantApiTokensPage } from './TenantApiTokens';
import { ApiTokensHeader } from './components/ApiTokensHeader';
import { ApiTokensLayout } from './components/ApiTokensLayout';
import { ApiTokensAddDialog } from './components/ApiTokensAddDialog';
import { ApiTokensSucceessDialog } from './components/ApiTokensSuccessDialog';
import { ApiTokensDeleteDialog } from './components/ApiTokensDeleteDialog';

export * from './UserApiTokens';
export * from './TenantApiTokens';

export const TenantApiTokens = {
  Page: TenantApiTokensPage,
  Header: ApiTokensHeader,
  Layout: ApiTokensLayout,
  AddDialog: ApiTokensAddDialog,
  SuccessDialog: ApiTokensSucceessDialog,
  DeleteDialog: ApiTokensDeleteDialog,
};

export const UserApiTokens = {
  Page: UserApiTokensPage,
  Header: ApiTokensHeader,
  Layout: ApiTokensLayout,
  AddDialog: ApiTokensAddDialog,
  SuccessDialog: ApiTokensSucceessDialog,
  DeleteDialog: ApiTokensDeleteDialog,
};
