import React from 'react';
import { Tab, TabProps } from 'semantic-ui-react';
import { ITabsProps } from './interfaces';

const mapper = ({ activeIndex, tabs, onTabChange }: ITabsProps): TabProps => ({
  activeIndex,
  panes: tabs.map((tab) => ({ menuItem: tab })),
  onTabChange: ((event, data) => onTabChange(data.activeIndex as number)),
});

export default class SemanticTabs extends React.Component<ITabsProps> {
  render() {
    return <Tab menu={{ secondary: true, pointing: true }} {...mapper(this.props)}/>;
  }
}
