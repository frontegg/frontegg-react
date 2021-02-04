import moment from 'moment';
import { Filter } from '../Api/interfaces';

export const getFilterType = (type: string): 'input' | 'select' => {
  switch (type) {
    case 'Timestamp':
      return 'select';
    case 'Severity':
      return 'select';
    default:
      return 'input';
  }
};

export const getFilterTime = (time: TimeValues) => {
  let value;
  switch (time) {
    case 'last_day':
      value = moment().utc().subtract(1, 'days').toISOString();
      break;
    case 'last_week':
      value = moment().utc().subtract(7, 'days').toISOString();
      break;
    case 'last_month':
      value = moment().utc().subtract(1, 'months').toISOString();
      break;
    case 'last_year':
      value = moment().utc().subtract(1, 'years').toISOString();
      break;
    default:
      value = moment().utc().toISOString();
  }
  return { $gt: value };
};

const capitalize = (s: string) => {
  if (typeof s !== 'string') return `${s}`;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getFilterName = (filter: Filter) => {
  switch (filter.key) {
    case 'createdAt':
      return 'Time';

    default:
      return capitalize(filter.key);
  }
};

export const getTimeDiff = (time: any) => {
  const currentTime = moment();
  const diff = currentTime.diff(time.$gt, 'day');
  return diff <= 1 ? 'last_day' : diff <= 7 ? 'last_week' : diff <= 30 ? 'last_month' : 'last_year';
};

export const getFilterValue = (filter: any) => {
  if (filter.key === 'createdAt') {
    return moment(filter.value.$gt).format('DD/MM/YYYY h:mm A');
  }
  return filter.value;
};

export const timeOptions: Array<TimeOptions> = [
  { label: 'Last Day', value: 'last_day' },
  { label: 'Last Week', value: 'last_week' },
  { label: 'Last Month', value: 'last_month' },
  { label: 'Last Year', value: 'last_year' },
];

export const severityOptions: Array<SeverityOptions> = [
  { label: 'Info', value: 'Info' },
  { label: 'Attention', value: 'Attention' },
  { label: 'Error', value: 'Error' },
];

export type TimeValues = 'last_day' | 'last_week' | 'last_month' | 'last_year';
type SeverityValues = 'Info' | 'Error' | 'Attention';
export interface TimeOptions {
  label: string;
  value: TimeValues;
}

export interface SeverityOptions {
  label: string;
  value: SeverityValues;
}

export interface FProps {
  value: string;
  onChange: (val: string) => void;
}
