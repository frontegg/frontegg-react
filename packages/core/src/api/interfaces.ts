export interface IFronteggRecord {
  __frontegg__loader?: boolean;
  __frontegg__error?: boolean;
}

export interface PaginationResult<T> {
  totalPages: number;
  items: T[];
}
