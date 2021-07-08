import { OldAuditsState } from './interfaces';

export const initialState: OldAuditsState = {
  total: 0,
  offset: 0,
  filter: '',
  sortBy: 'createdAt',
  context: null,
  filters: [],
  rowsData: [],
  lastUpdated: new Date(),
  isLoading: true,
  isFetchMore: false,
  totalToday: 0,
  currentPage: 0,
  headerProps: [],
  sortDirection: 'desc',
  severeThisWeek: 0,
  predefinedFilters: [],
  isDownloadingCsv: false,
  isDownloadingPdf: false,
  virtualScroll: false,
};
