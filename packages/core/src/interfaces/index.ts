import { ReactElement } from 'react';
import { AuthActions } from '@frontegg/react-auth';

declare global {
  interface Window {
    Cypress: any;
    cypressStore: any;
    cypressHistory: any;
  }
}

export interface KeyValuePair {
  key: string;
  value: string;
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

export interface ContextOptions {
  baseUrl: string;
  tokenResolver?: () => Promise<string> | string; // custom resolve Authorization Header value
  additionalQueryParamsResolver?: () => Promise<KeyValuePair[]> | KeyValuePair[];
  additionalHeadersResolver?: () => Promise<KeyValuePair[]> | KeyValuePair[];
  requestCredentials?: RequestCredentials;
  theme?: ThemeOptions | any;
  isDemonstration?: boolean;
  errorComponent?: ReactElement | string;
  currentUserId?: string;
  currentUserRoles?: string[];
  currentUserPermissions?: string[];
  urlPrefix?: string;
}

export interface ListenerProps<T> {
  resolveActions?: (storeName: string, actions: T) => void;
}
