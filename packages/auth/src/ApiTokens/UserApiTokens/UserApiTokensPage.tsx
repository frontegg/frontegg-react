import React, { FC, useEffect } from 'react';
import { ApiTokenType } from '@frontegg/redux-store/auth';
import { prefixCls } from '../constants';
import { useApiTokensActions, useApiTokensState } from '../hooks';
import { ApiTokensHeader } from '../components/ApiTokensHeader';
import { ApiTokensLayout } from '../components/ApiTokensLayout';

const apiTokenType: ApiTokenType = 'user';

export const UserApiTokensPage: FC = (props) => {
  const { initApiTokensData } = useApiTokensActions();
  const { apiTokenType: tokenType } = useApiTokensState(({ apiTokenType }) => ({ apiTokenType }));

  useEffect(() => {
    initApiTokensData(apiTokenType);
  }, []);

  const children = props.children ?? (
    <>
      <ApiTokensHeader />
      <ApiTokensLayout />
    </>
  );

  return <div className={prefixCls}>{tokenType && children}</div>;
};
