import React, { FC } from 'react';
import { BasePageProps } from '../interfaces';
import { reloadProfileIfNeeded } from './helpers';
import {
  buildTabsFromChildren,
  checkValidChildren,
  RootPathContext,
  useRootPath,
  Logger,
  PageTabs,
} from '@frontegg/react-core';
import { ProfileInfoPage } from './ProfileInfoPage';
import { ProfilePasswordSettingsPage } from './ProfilePasswordSettingsPage';
import { ProfileMfaPage } from './ProfileMfaPage';
import { Redirect, Route, Switch } from 'react-router';
import { useAuth } from '../hooks';

export const ProfileTabs = PageTabs;
const logger = Logger.from('ProfileRouter');
export const ProfileRouter: FC<BasePageProps> = (props) => {
  const { verified } = useAuth((state) => ({ verified: state.user?.verified }));
  const [rootPath, isRootPathContext] = useRootPath(props, '/profile');
  reloadProfileIfNeeded();
  checkValidChildren('Profile.Router', 'Profile', props.children, {
    // ProfileInfoPage,
    // ProfilePasswordSettingsPage,
    // ProfileMfaPage,
  });

  const children = props.children ?? (
    <>
      <ProfileInfoPage key='ProfileInfoPage' />,
      <ProfilePasswordSettingsPage key='ProfilePasswordSettingsPage' />,
      <ProfileMfaPage key='ProfileMfaPage' />,
    </>
  );

  const [defaultTabs, invalidTabs] = buildTabsFromChildren(rootPath, children);
  invalidTabs.length > 0 &&
    logger.error(`Children at positions [${invalidTabs.join(', ')}] should implement ProfilePage interface.`);

  if (!isRootPathContext) {
    return <RootPathContext.Provider value={rootPath}>{children}</RootPathContext.Provider>;
  }

  const tabs = defaultTabs.map((tab) => {
    if (!verified && tab.route.includes('password')) return { ...tab, disabled: true };
    return tab;
  });

  return (
    <>
      <ProfileTabs tabs={tabs} />
      <Switch>
        {tabs.map((tab: any) => (
          <Route exact key={tab.route} path={tab.route}>
            {tab.comp}
          </Route>
        ))}
        <Redirect from='*' to={tabs?.[0]?.route ?? '/'} />
      </Switch>
    </>
  );
};
