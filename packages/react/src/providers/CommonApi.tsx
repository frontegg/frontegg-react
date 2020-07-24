import React, { ComponentType, Provider as ReactContextProvider } from 'react';
import { omitProps } from '../helpers';


export const CommonApi = <P extends {  }>(Component: ReactContextProvider<P>): ComponentType<P> => {
  return class StateConnector extends React.Component<P> {
    render() {
      return <Component value={omitProps(this.props, ['children'])}>
        {this.props.children}
      </Component>;
    }
  };
};
