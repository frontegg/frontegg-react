import React, { ChangeEvent, FC, FormEvent } from 'react';
import { TabProps } from '@frontegg/react-core';
import MaterialTabs, { TabsProps as MaterialTabsProps } from '@material-ui/core/Tabs';
import MaterialTab from '@material-ui/core/Tab';

const mapper = ({ activeTab, onTabChange, items }: TabProps): MaterialTabsProps => ({
  value: activeTab,
  onChange: ((event: any, value: any) => onTabChange(event, value)) as any,
});

export const Tabs: FC<TabProps> = (props) => {
  const tabs = props.items.map((m, index) => <MaterialTab key={index} value={index} label={React.createElement(m)} />);
  const tabsProps = mapper(props);
  return (
    <MaterialTabs textColor={'primary'} indicatorColor={'primary'} {...tabsProps}>
      {tabs}
    </MaterialTabs>
  );
};
