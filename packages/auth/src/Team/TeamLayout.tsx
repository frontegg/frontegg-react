import React, { FC } from 'react';
import { TeamTableToolbar } from './TeamTableToolbar';
import { TeamTable } from './TeamTable';
import { TeamAddUserDialog } from './TeamAddUserDialog';
import { TeamDeleteUserDialog } from './TeamDeleteUserDialog';

export const TeamLayout: FC = (props) => {
  const children = props.children ?? (
    <>
      <TeamTableToolbar />
      <TeamTable />
      <TeamAddUserDialog />
      <TeamDeleteUserDialog />
    </>
  );
  return <div className='fe-team__layout'>{children}</div>;
};
