import { AuditsState } from './interfaces';
import moment from 'moment';

export const initialState: AuditsState = {
  total: 0,
  offset: 0,
  filter: '',
  sortBy: 'createdAt',
  context: null,
  filters: [],
  rowsData: [],
  lastUpdated: moment(),
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
};
