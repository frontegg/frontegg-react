import React from 'react';
import { TabProps } from '@frontegg/react-core';
import { Tab as SemanticTab, TabProps as SemanticTabProps } from 'semantic-ui-react';

const mapper = (props: TabProps): SemanticTabProps => ({
  secondary: true,
  pointing: true,
  ...props,
});

export class Tab extends React.Component<TabProps> {
  render() {
    return <SemanticTab {...mapper(this.props)} />;
  }
}
