import { AuditsState } from './interfaces';

export const initialState: AuditsState = {
  total: 0,
  offset: 0,
  filter: '',
  sortBy: 'createdAt',
  context: null,
  filters: [],
  rowsData: [],
  isLoading: true,
  isFetchMore: false,
  totalToday: 0,
  currentPage: 0,
  headerProps: [],
  sortDirection: 'desc',
  severeThisWeek: 0,
  predefinedFilters: [],
};
