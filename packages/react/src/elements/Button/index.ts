import React from 'react';
import { IButtonProps } from './interfaces';
import { LibraryBasedElement } from '../LibraryBasedElement';

export const Button = LibraryBasedElement<IButtonProps>({
  semantic: React.lazy(() => import('./SemanticButton')),
});
