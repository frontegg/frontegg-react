import React, { FC } from 'react';
import { TabProps, TabItem } from '@frontegg/react-core';
import { Tabs as MaterialTabs, TabsProps as MaterialTabsProps, Tab as MaterialTab } from '@material-ui/core';

const mapper = ({ activeTab, onTabChange, className }: TabProps): MaterialTabsProps => ({
  value: activeTab,
  onChange: ((event: any, value: any) => onTabChange(event, value)) as any,
  className,
});

export const Tabs: FC<TabProps> = (props) => {
  const tabs = props.items.map(({ Title, disabled }: TabItem, index: number) => (
    <MaterialTab key={index} value={index} disabled={disabled} label={Title} />
  ));

  const tabsProps = mapper(props);
  return (
    <MaterialTabs textColor={'primary'} indicatorColor={'primary'} {...tabsProps}>
      {tabs}
    </MaterialTabs>
  );
};
