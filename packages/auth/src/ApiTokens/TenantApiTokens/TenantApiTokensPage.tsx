import React, { FC, useEffect } from 'react';
import { ApiTokensHeader } from '../components/ApiTokensHeader';
import { ApiTokensLayout } from '../components/ApiTokensLayout';
import { prefixCls } from '../constants';
import { useApiTokensActions, useApiTokensState } from '../hooks';
import { ApiTokenType, ApiTokensState } from '../../Api/ApiTokensState';

const apiTokenType: ApiTokenType = 'tenant';

export interface TenantApiTokensPageProps {
  createdByUserIdColumn?: 'show' | 'hide';
}

export const TenantApiTokensPage: FC<TenantApiTokensPageProps> = (props) => {
  const { initApiTokensData, setApiTokensState } = useApiTokensActions();
  const { apiTokenType: tokenType } = useApiTokensState(({ apiTokenType }) => ({ apiTokenType }));
  const { createdByUserIdColumn } = props;

  useEffect(() => {
    initApiTokensData(apiTokenType);
    createdByUserIdColumn && setApiTokensState({ createdByUserIdColumn });
  }, []);

  const children = props.children ?? (
    <>
      <ApiTokensHeader />
      <ApiTokensLayout />
    </>
  );

  return <div className={prefixCls}>{tokenType && children}</div>;
};
