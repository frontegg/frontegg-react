export interface ISettingsResponse {
  address?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  currency?: string;
  logo?: string;
}

export type IUpdateSettings = Partial<ISettingsResponse>;
