import React, { FC } from 'react';
import { TenantApiTokens } from '@frontegg/react-auth';

export const TenantApiTokensExample: FC = () => {
  return (
    <TenantApiTokens.Page>
      <TenantApiTokens.Header />
      <TenantApiTokens.Layout>
        <TenantApiTokens.Toolbar />
        <TenantApiTokens.Table />
        <TenantApiTokens.AddDialog />
        <TenantApiTokens.SuccessDialog />
        <TenantApiTokens.DeleteDialog />
      </TenantApiTokens.Layout>
    </TenantApiTokens.Page>
  );
};
