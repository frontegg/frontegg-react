import React from 'react';
import { ILoaderProps } from './interfaces';
import { Loader, LoaderProps } from 'semantic-ui-react';


const mapper = ({ inline, centered, ...rest }: ILoaderProps): LoaderProps => ({
  active: true,
  inline: centered ? 'centered' : inline,
  ...rest,
});
export default class SemanticLoader extends React.Component<ILoaderProps> {
  render() {
    return <Loader {...mapper(this.props)}/>;
  }
}
