import * as React from 'react';
import { CommonApiProps } from './CommonApi';
import { ComponentType, Consumer } from 'react';
import { memoEqual } from './DynamicComponent';

export const CommonApiHOC = <T extends CommonApiProps, C>(displayName: string, CommonConsumer: Consumer<C>) =>
  <P extends {}, X>(Component: React.ComponentType<P>, selectors: (selectors: C) => X) => {

    const MemoComponent = React.memo(Component as ComponentType<any>, memoEqual);

    return class extends React.Component<Omit<P, keyof X>> {
      static displayName = `with${displayName}Api`;

      render() {
        return <CommonConsumer>
          {(api: C | null) => {
            if (api == null) {
              const error = `${displayName} components must be wrapped by ${displayName}Provider`;
              console.error(error);
              return <div>{error}</div>;
            }
            const props: P = { ...selectors(api), ...this.props } as any;
            return <MemoComponent {...props}/>;
          }}
        </CommonConsumer>;
      }
    };
  };
