import React from 'react';
import { ITabsProps } from './interfaces';
import { LibraryBasedElement } from '../LibraryBasedElement';
export * from './interfaces'

export const Tabs = LibraryBasedElement<ITabsProps>({
  semantic: React.lazy(() => import('./SemanticTabs')),
});
