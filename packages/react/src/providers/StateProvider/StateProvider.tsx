import React, { ComponentType, Provider as ReactContextProvider } from 'react';
import { connect } from 'react-redux';
import { sagaActions, sagaState } from './saga';
import { memoEqual } from '../DynamicComponent';
import { IPluginConfigs } from './interfaces';
import { omitProps } from '../../helpers';

export type IFronteggMapper = IPluginConfigs & ReturnType<typeof sagaState> & ReturnType<typeof sagaActions>;

const { Provider: StateContextProvider, Consumer: StateContextConsumer } = React.createContext<IFronteggMapper>({} as IFronteggMapper);


export const createStateConnector = <P extends {}>(Component: ReactContextProvider<P>): ComponentType<P> => {
  return class StateConnector extends React.Component<P> {
    render() {
      return <Component value={omitProps(this.props, ['children'])}>
        {this.props.children}
      </Component>;
    }
  };
};

export const RegisterPlugin = <T extends {}>(Component: React.ComponentType<T>) => {
  const StateConnector = connect(sagaState, sagaActions)(createStateConnector<IFronteggMapper>(StateContextProvider));
  return function RegisterPlugin(props: T) {
    return <StateConnector>
      <Component {...props}/>
    </StateConnector>;
  };
};


export const connectFrontegg = <P extends {}, X>(
  Component: React.ComponentType<P>,
  selectors: (selectors: IFronteggMapper) => X,
): ComponentType<Omit<P, keyof X>> => {
  const MemoComponent = React.memo(Component as ComponentType<any>, memoEqual);
  return class ConnectFrontegg extends React.Component<Omit<P, keyof X>> {
    render() {
      return <StateContextConsumer>
        {(api: IFronteggMapper | null) => {
          if (api == null) {
            const error = `Frontegg Provider must be configured`;
            console.error(error);
            return <div>{error}</div>;
          }
          const props: P = { ...selectors(api), ...this.props } as any;
          return <MemoComponent {...props}/>;
        }}
      </StateContextConsumer>;
    }
  };
};
