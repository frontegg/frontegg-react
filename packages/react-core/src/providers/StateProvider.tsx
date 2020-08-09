import React, { ComponentType, Provider as ReactContextProvider, Suspense } from 'react';
import { connect } from 'react-redux';
import { FronteggConfig, sagaActions, sagaState } from '@api';
import { memoEqual } from './DynamicComponent';
import { omitProps } from '@helpers';
import { WithTranslation } from 'react-i18next';
import { I18nContext } from 'react-i18next';
import { i18n, TFunction } from 'i18next';

export type IFronteggMapper =
  & { i18n: i18n; t: TFunction; }
  & { config?: FronteggConfig; }
  & ReturnType<typeof sagaState>
  & ReturnType<typeof sagaActions>;

const { Provider: StateContextProvider, Consumer: StateContextConsumer } = React.createContext<IFronteggMapper>({} as IFronteggMapper);


export const createStateConnector = <P extends {}>(Component: ReactContextProvider<P>): ComponentType<Omit<P, keyof WithTranslation>> => {
  return class StateConnector extends React.Component<Omit<P, keyof WithTranslation>> {
    render() {
      return <I18nContext.Consumer>{({ i18n }: any) =>
        <Component value={omitProps({ ...this.props, i18n, t: i18n.t.bind(i18n) }, ['children'])}>
          {this.props.children}
        </Component>
      }</I18nContext.Consumer>;
    }
  };
};

export const RegisterPlugin = <T extends {}>(Component: React.ComponentType<T>) => {
  const StateConnector = connect(sagaState, sagaActions)(createStateConnector<IFronteggMapper>(StateContextProvider));
  return function RegisterPlugin(props: T) {
    return <StateConnector>
      <Suspense fallback=''>
        <Component {...props}/>
      </Suspense>
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
