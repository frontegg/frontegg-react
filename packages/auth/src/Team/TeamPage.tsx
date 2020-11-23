import React, { FC, useMemo } from 'react';
import {
  checkValidChildren,
  RootPathContext,
  useRootPath,
  useProxyComponent,
  ProxyComponent,
} from '@frontegg/react-core';
import { BasePageProps } from '../interfaces';
import { TeamLayout } from './TeamLayout';
import { TeamHeader } from './TeamHeader';

export interface TeamPageProps extends BasePageProps, ProxyComponent {}

export const TeamPage: FC<TeamPageProps> = (props) => {
  const proxyPortals = useProxyComponent(props);
  useMemo(() => checkValidChildren('Team.Page', 'Team', props.children, { TeamLayout }), [props.children]);

  const children = props.children ?? (
    <>
      <TeamHeader />
      <TeamLayout />
    </>
  );
  return (
    <>
      <div className='fe-team__page'>{children}</div>
      {proxyPortals}
    </>
  );
};
