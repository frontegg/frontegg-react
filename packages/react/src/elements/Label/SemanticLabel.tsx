import React from 'react';
import { ILabel } from './interfaces';
import { Label, LabelProps } from 'semantic-ui-react';


const mapper = (props: ILabel): LabelProps => props;

export default class SemanticLoader extends React.Component<ILabel> {
  render() {
    return <Label {...mapper(this.props)}/>;
  }
}
