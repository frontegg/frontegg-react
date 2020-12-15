import React, { FC } from 'react';
import { ApiTokensTableToolbar } from '../components/ApiTokensTableToolbar';
import { ApiTokensTableComponent } from '../components/ApiTokensTableComponent';
import { ApiTokensSucceessDialog } from './ApiTokensSuccessDialog';
import { ApiTokensAddDialog } from './ApiTokensAddDialog';
import { ApiTokensDeleteDialog } from './ApiTokensDeleteDialog';

export const ApiTokensLayout: FC = (props) => {
  const children = props.children ?? (
    <>
      <ApiTokensTableToolbar />
      <ApiTokensTableComponent />
      <ApiTokensAddDialog />
      <ApiTokensSucceessDialog />
      <ApiTokensDeleteDialog />
    </>
  );

  return <>{children}</>;
};
