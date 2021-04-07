export interface AccountSettingsState {
  loading: boolean;
  error?: any;
  address?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  currency?: string;
  logo?: string;
}
