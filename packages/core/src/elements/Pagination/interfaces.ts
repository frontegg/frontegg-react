import { MouseEvent } from 'react';

export interface PaginationProps {
  count: number;
  page: number;
  onChange: (e: MouseEvent<HTMLElement>, value: number) => void;
}
