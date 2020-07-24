import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { sagaActions, sagaState } from './saga';
import { CommonApi } from '../CommonApi';
import { memoEqual } from '../DynamicComponent';

export type IFronteggMapper = ReturnType<typeof sagaState> & ReturnType<typeof sagaActions>;

const { Provider: StateContextProvider, Consumer: StateContextConsumer } = React.createContext<IFronteggMapper>({} as IFronteggMapper);

const StateConnector = connect(sagaState, sagaActions)(CommonApi<IFronteggMapper>(StateContextProvider));

export const PluginConsumer = <T extends {}>(Component: React.ComponentType<T>) => (props: T) => <StateConnector>
  <Component {...props}/>
</StateConnector>;


export const connectFrontegg = <P extends {}, X>(
  Component: React.ComponentType<P>,
  selectors: (selectors: IFronteggMapper) => X,
) => {
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
