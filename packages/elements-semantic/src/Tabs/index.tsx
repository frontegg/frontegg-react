import React, { FC } from 'react';
import { TabProps } from '@frontegg/react-core';
import { Tab as SemanticTab, TabProps as SemanticTabProps, Menu } from 'semantic-ui-react';
import classNames from 'classnames';
import './style.scss';

const Tab = Menu.Item;
const mapper = ({ activeTab, onTabChange, items, className, ...props }: TabProps): SemanticTabProps => ({
  activeIndex: activeTab,
  onTabChange: (e, data) => onTabChange(e, data.activeIndex as number),
  menu: { secondary: true, pointing: true },
  panes: items.map((m, index) => ({ menuItem: <Tab key={index}>{React.createElement(m)}</Tab> })),
  className: classNames('fe-semantic-tabs', className),
  ...props,
});

export const Tabs: FC<TabProps> = (props) => {
  return <SemanticTab {...mapper(props)} />;
};
