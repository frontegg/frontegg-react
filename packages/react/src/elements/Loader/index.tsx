import React from 'react';
import { ILoaderProps } from './interfaces';
import { LibraryBasedElement } from '../LibraryBasedElement';
export * from './interfaces'

export const Loader = LibraryBasedElement<ILoaderProps>({
  semantic: React.lazy(() => import('./SemanticLoader')),
});
