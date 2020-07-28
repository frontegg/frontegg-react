import React from 'react';
import { ILabel } from './interfaces';
import { LibraryBasedElement } from '../LibraryBasedElement';

export * from './interfaces';
export const Label = LibraryBasedElement<ILabel>({
  semantic: React.lazy(() => import('./SemanticLabel')),
});
