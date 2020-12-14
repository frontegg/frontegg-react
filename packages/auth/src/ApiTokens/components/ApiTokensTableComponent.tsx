import React, { FC, useEffect, useState } from 'react';
import { useApiTokensState } from '../hooks';
import { Table } from '@frontegg/react-core';
import { prefixCls, tableColumnsUser, tableColumnsTenant } from '../constants';
import { IUserApiTokensData, ITenantApiTokensData } from '../../Api/ApiTokensState/interfaces';

export const ApiTokensTableComponent: FC = () => {
  const { loading, apiTokensDataUser, apiTokensDataTenant, apiTokenType, searchValue } = useApiTokensState(
    ({ loaders: { LOAD_API_TOKENS: loading }, apiTokensDataUser, apiTokensDataTenant, apiTokenType, searchValue }) => ({
      loading,
      apiTokensDataUser,
      apiTokensDataTenant,
      apiTokenType,
      searchValue,
    })
  );
  const [data, setData] = useState(apiTokenType === 'user' ? apiTokensDataUser : apiTokensDataTenant);

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

  return (
    <Table
      rowKey='clientId'
      data={data}
      loading={!!loading}
      className={`${prefixCls}__table`}
      columns={apiTokenType === 'user' ? tableColumnsUser : tableColumnsTenant}
      totalData={apiTokenType === 'user' ? apiTokensDataUser.length : apiTokensDataTenant.length}
    />
  );
};
