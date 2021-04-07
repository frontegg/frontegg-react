import React, { FC, useMemo } from 'react';
import { checkValidChildren, RootPathContext, useRootPath } from '@frontegg/react-core';
import { ProfileHeader } from './ProfileHeader';
import { ProfileRouter } from './ProfileRouter';
import { BasePageProps } from '../interfaces';
import { reloadProfileIfNeeded } from './hooks';

export const ProfilePage: FC<BasePageProps> = (props) => {
  const [rootPath] = useRootPath(props, '/profile');
  reloadProfileIfNeeded();
  useMemo(() => checkValidChildren('Profile.Page', 'Profile', props.children, { ProfileRouter }), [props.children]);

  const children = props.children ?? (
    <>
      <ProfileHeader />
      <ProfileRouter />
    </>
  );
  return (
    <RootPathContext.Provider value={rootPath}>
      <div className='fe-profile-page'>{children}</div>
    </RootPathContext.Provider>
  );
};
