import React from 'react';
import { ITable } from './interfaces';
import { LibraryBasedElement } from '../LibraryBasedElement';

export * from './interfaces';
export * from './TableCells';
export const Table = LibraryBasedElement<ITable>({
  semantic: React.lazy(() => import('./SemanticTable')),
});
