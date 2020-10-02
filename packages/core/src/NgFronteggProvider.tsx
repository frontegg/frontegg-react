import React, { FC } from 'react';
import { FeProviderProps, FronteggProvider } from './FronteggProvider';

export class NgFronteggProvider extends React.Component<FeProviderProps> {
  constructor(props: FeProviderProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Readonly<FeProviderProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return false;
  }

  render() {
    const { children, ...providerProps } = this.props;
    return (
      <FronteggProvider {...providerProps}>
        <div className='my-inner-listener' />
        <div className='my-inner-content'>{children}</div>
      </FronteggProvider>
    );
  }
}
