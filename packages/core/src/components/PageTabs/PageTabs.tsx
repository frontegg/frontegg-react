import React, { ComponentType, FC, useMemo, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { ProfileTabsProps } from '@frontegg/react-auth/dist/Profile/ProfileTabs';
import { Tabs } from '../../ElementsFactory';
import { ContextHolder } from '../../api';

export type PageTabProps = {
  Title: ComponentType;
  route: string;
  comp?: ComponentType;
};

const findMatchPath = (pathname: string, tabs: { route: string }[]) => {
  const activeTab = tabs.findIndex(({ route }) => matchPath(pathname, { path: route, exact: true }));
  return activeTab === -1 ? 0 : activeTab;
};
export const PageTabs: FC<ProfileTabsProps> = (props) => {
  const location = useLocation();
  const firstMatch = useMemo(() => findMatchPath(location.pathname, props.tabs), []);
  const [activeTab, setActiveTab] = useState(firstMatch);
  const items = useMemo(() => props.tabs.map(({ Title }) => Title), [props.tabs]);

  return (
    <div className='fe-tabs'>
      <Tabs
        items={items}
        activeTab={activeTab}
        onTabChange={(event, activeTab) => {
          ContextHolder.onRedirectTo(props.tabs[activeTab].route, { replace: true });
          setActiveTab(activeTab);
        }}
      />
    </div>
  );
};
