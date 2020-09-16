import React, { FC } from 'react';
import { TabProps } from '@frontegg/react-core';
import { Tabs as MaterialTabs, TabsProps as MaterialTabsProps, Tab as MaterialTab } from '@material-ui/core';

const mapper = ({ activeTab, onTabChange }: TabProps): MaterialTabsProps => ({
  value: activeTab,
  onChange: ((event: any, value: any) => onTabChange(event, value)) as any,
});

export const Tabs: FC<TabProps> = (props) => {
  const tabs = props.items.map((m: any, index: number) => (
    <MaterialTab key={index} value={index} label={React.createElement(m)} />
  ));
  const tabsProps = mapper(props);
  return (
    <MaterialTabs textColor={'primary'} indicatorColor={'primary'} {...tabsProps}>
      {tabs}
    </MaterialTabs>
  );
};
