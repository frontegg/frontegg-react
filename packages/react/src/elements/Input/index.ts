import React from 'react';
import { IInputProps } from './interfaces';
import { LibraryBasedElement } from '../LibraryBasedElement';

export const Input = LibraryBasedElement<IInputProps>({
  semantic: React.lazy(() => import('./SemanticInput')),
});
