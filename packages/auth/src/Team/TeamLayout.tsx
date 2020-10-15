import React, { FC } from 'react';
import { reloadTeamIfNeeded } from './helpers';
import { TeamTableToolbar } from './TeamTableToolbar';
import { TeamTable } from './TeamTable';

export const TeamLayout: FC = (props) => {
  reloadTeamIfNeeded();

  const children = props.children ?? (
    <>
      <TeamTableToolbar />
      <TeamTable />
    </>
  );
  return <div className='fe-team__layout'>{children}</div>;
};
