import { UILibrary } from '@providers';
import React, { FunctionComponent } from 'react';

export function LibraryBasedElement<P>(components: { [T in UILibrary]: any }): FunctionComponent<P> {

  const _components: { [T in UILibrary]: any } = {
    semantic: React.memo(components.semantic),
  };
  return props => {
    const Component = _components['semantic'];
    return <Component {...props}/>;
  };
}
