import { AuditRowData, ContextOptions, SortDirectionType } from '@frontegg/rest-api';

export interface DataSorting {
  sortDirection: SortDirectionType;
  sortBy: string;
}

export interface ColorOptions {
  foreground?: string;
  background?: string;
}

export interface ThemeOptions {
  tableMaxWidth?: string;
  filterBoxColor?: ColorOptions;
  tableHeaderColor?: ColorOptions;
  tableRowColor?: ColorOptions;
  tableRowTimeStatusColor?: string;
  addButtonColor?: ColorOptions;
  deleteButtonColor?: ColorOptions;
  tableFontSizeNames?: string;
  tableFontSizeDescriptions?: string;
  tableRowHeight?: string;
  tableTextLineHeight?: string;
  tableTextFontFamily?: string;
  paginationControlsColor?: ColorOptions;
  modalDialogHeaderColor?: ColorOptions;
  modalCancelButtonColor?: ColorOptions;
  modalAcceptButtonColor?: ColorOptions;
  addBellBackgroundColor?: string;
  addUnreadIndicatorColor?: ColorOptions;
  addPinBackgroundColor?: string;
  notificationsBoxShowTitle?: boolean;
  notificationsBoxShadow?: boolean;
  notificationsBoxBorderRadius?: string;
  notificationsBoxWidth?: string;
  notificationsBoxFontSize?: string;
  notificationsBoxForeColor?: string;
  notificationsBoxBackColor?: string;
  notificationsBoxBorderColor?: string;
  notificationsRowHeight?: string;
  notificationsRowPadding?: string;
  notificationsRowBackgroundColor?: string;
  notificationsRowTimePresentation?: 'absolute' | 'conditional';
  notificationsRowTitleColor?: string;
  notificationsRowTitleFontSize?: string;
  notificationsRowDescriptionColor?: string;
  notificationsRowTitleFontWeight?: string;
  notificationsRowDescriptionFontSize?: string;
  notificationsRowDescriptionFontWeight?: string;
  notificationsRowPresentationColor?: string;
  notificationsRowPresentationFontSize?: string;
  notificationsRowPresentationFontWeight?: string;
  notificationsBellIcon?: string;
  notificationsBellIconSize?: string;
  notificationsBellForeColor?: string;
  notificationsBellBackColor?: string;
  notificationsAlertLocation?: string;
  notificationsAlertIconSize?: string;
  notificationsAlertForeColor?: string;
  notificationsAlertBackColor?: string;
  notificationsAlertBadgeCount?: string;
  notificationsOptionsPin?: string;
  notificationsOptionsDelete?: string;
  notificationsOptionsIconType?: string;
  notificationsOptionsLocation?: string;
  notificationsOptionsColor?: string;
  notificationsUnreadRowBackgroundColor?: string;
  notificationsUnreadRowTitleColor?: string;
  notificationsUnreadRowTitleFontSize?: string;
  notificationsUnreadRowTitleFontWeight?: string;
  notificationsUnreadRowDescriptionColor?: string;
  notificationsUnreadRowDescriptionFontSzie?: string;
  notificationsUnreadRowTimePresentationColor?: string;
  notificationsUnreadRowTimePresentationFontSize?: string;
  notificationsPaginationType?: string;
  notificationsPaginationColor?: string;
  notificationsPaginationSize?: string;
  notificationsPaginationWeight?: string;
}

export interface HeaderProps {
  chosen: boolean;
  selected: boolean;
  name: keyof AuditRowData;
  type: string;
  sortable: boolean;
  filterable: boolean;
  displayName: string;
  showInTable: boolean;
  showInMoreInfo: string;
}

export interface AuditsFilter {
  key: string;
  value: string;
}

export type AuditsErrorKeys = {
  [S in keyof AuditsState['error']]: any;
};

export interface AuditsState {
  total: number;
  error?: { metadata?: string; stats?: string; audits?: string };
  offset: number;
  filter: string;
  sortBy: string;
  filters: AuditsFilter[];
  context: ContextOptions | null;
  rowsData: AuditRowData[];
  lastUpdated: Date;
  isLoading: boolean;
  totalToday: number;
  headerProps: HeaderProps[];
  themeAudits?: ThemeOptions;
  currentPage: number;
  isFetchMore: boolean;
  sortDirection: SortDirectionType;
  severeThisWeek: number;
  predefinedFilters: { [key: string]: string }[];
  isDownloadingCsv?: boolean;
  isDownloadingPdf?: boolean;
}

export interface LoadAuditsPayload {
  count?: number;
  sortBy?: string;
  filter?: string | null;
  offset?: number;
  appendMode?: boolean;
  onlyOneLoad?: boolean;
  sortDirection?: SortDirectionType;
}
