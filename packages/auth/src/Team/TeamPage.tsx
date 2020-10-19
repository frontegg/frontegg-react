import React, { FC, useMemo } from 'react';
import { checkValidChildren, RootPathContext, useRootPath } from '@frontegg/react-core';
import { BasePageProps } from '../interfaces';
import { TeamLayout } from './TeamLayout';
import { TeamHeader } from './TeamHeader';
import { reloadTeamIfNeeded } from './helpers';

export type TeamPageProps = BasePageProps;

export const TeamPage: FC<TeamPageProps> = (props) => {
  reloadTeamIfNeeded();

  const [rootPath] = useRootPath(props, '/team');
  useMemo(() => checkValidChildren('Team.Page', 'Team', props.children, { TeamLayout }), [props.children]);

  const children = props.children ?? (
    <>
      <TeamHeader />
      <TeamLayout />
    </>
  );

  return (
    <RootPathContext.Provider value={rootPath}>
      <div className='fe-team__page'>{children}</div>
    </RootPathContext.Provider>
  );
};
