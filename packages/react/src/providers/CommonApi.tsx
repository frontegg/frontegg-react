import React, { ComponentType, Provider as ReactContextProvider } from 'react';
import { ContextOptions } from './context';
import { omitProps } from '../helpers';

export type CommonApiProps = { rootDir?: string, context: ContextOptions; }
export type RequirePartial<T, KP> = Partial<T> & { [K in keyof KP]-?: K extends keyof T ? T[K] : never };

export const CommonApi = <P extends CommonApiProps>(Component: ReactContextProvider<P>): ComponentType<P> => {
  return class StateConnector extends React.Component<P> {
    constructor(props: P) {
      super(props);
      // @ts-ignore
      this.props.actions.setContext?.(props.context);
    }

    render() {
      return <Component value={omitProps(this.props, ['children'])}>
        {this.props.children}
      </Component>;
    }
  };
};
