import { UILibrary, UILibraryConsumer } from '../providers';
import React, { FunctionComponent } from 'react';

export function LibraryBasedElement<P>(components: { [T in UILibrary]: any }): FunctionComponent<P & { library?: UILibrary }> {
  const _components: { [T in UILibrary]: any } = {
    semantic: React.memo(components.semantic),
  };
  return ({ library: libraryProp, ...rest }: P & { library?: UILibrary }) => <UILibraryConsumer>
    {(library: UILibrary) => {
      const Component = _components[libraryProp || library];
      return <Component {...rest}/>;
    }}
  </UILibraryConsumer>;
}
