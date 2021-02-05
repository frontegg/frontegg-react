import React, { FC, useEffect, useMemo, useState } from 'react';
import { Loader, Table, useT } from '@frontegg/react-core';
import { IUserApiTokensData, ITenantApiTokensData } from '@frontegg/redux-store/auth';
import { useApiTokensState } from '../hooks';
import { prefixCls, tableColumnsUser, tableColumnsTenant } from '../constants';

export const ApiTokensTableComponent: FC = () => {
  const {
    loading,
    apiTokensDataUser,
    apiTokensDataTenant,
    apiTokenType,
    searchValue,
    createdByUserIdColumn,
  } = useApiTokensState(
    ({
      loaders: { LOAD_API_TOKENS: loading },
      apiTokensDataUser,
      apiTokensDataTenant,
      apiTokenType,
      searchValue,
      createdByUserIdColumn,
    }) => ({
      loading,
      apiTokensDataUser,
      apiTokensDataTenant,
      apiTokenType,
      searchValue,
      createdByUserIdColumn,
    })
  );
  const [data, setData] = useState<Array<ITenantApiTokensData | IUserApiTokensData> | undefined>(undefined);
  const { t } = useT();

  useEffect(() => {
    apiTokenType === 'user'
      ? setData(
          apiTokensDataUser.filter((i: IUserApiTokensData) => {
            return i.clientId?.includes(searchValue) || i.description?.includes(searchValue);
          })
        )
      : setData(
          apiTokensDataTenant.filter((i: ITenantApiTokensData) => {
            return (
              i.clientId?.includes(searchValue) ||
              i.description?.includes(searchValue) ||
              i.createdByUserId?.includes(searchValue)
            );
          })
        );
  }, [searchValue, apiTokensDataUser, apiTokensDataTenant]);

  const preparedTenantColumns = useMemo(() => {
    return createdByUserIdColumn === 'hide'
      ? tableColumnsTenant(t).filter((i) => i.accessor !== 'createdByUserId')
      : tableColumnsTenant(t);
  }, [createdByUserIdColumn, tableColumnsTenant]);

  if (!!loading || !data) {
    return <Loader center />;
  }

  return (
    <Table
      rowKey='clientId'
      data={data}
      loading={!!loading}
      className={`${prefixCls}__table`}
      columns={apiTokenType === 'user' ? tableColumnsUser(t) : preparedTenantColumns}
      totalData={apiTokenType === 'user' ? apiTokensDataUser.length : apiTokensDataTenant.length}
    />
  );
};
