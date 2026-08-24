import moment from 'moment';
import { Filter } from '@frontegg/redux-store/audits/backward-compatibility';

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

  if (typeof time === 'object' && new Date(time.from).toString() !== 'Invalid Date') {
    if (new Date(time.to).toString() !== 'Invalid Date') {
      return { $gt: time.from.toISOString(), $lt: time.to.toISOString() };
    }
    return { $gt: time.from.toISOString() };
  }
  switch (time) {
    case 'last_hour':
      value = moment().utc().subtract(1, 'hours').toISOString();
      break;
    case 'last_4_hours':
      value = moment().utc().subtract(4, 'hours').toISOString();
      break;
    case 'last_12_hours':
      value = moment().utc().subtract(12, 'hours').toISOString();
      break;
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
  // noinspection SuspiciousTypeOfGuard
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
    let value = moment(filter.value.$gt).format('DD/MM/YYYY H:mm');
    if (filter.value.$lt) {
      value += ` - ${moment(filter.value.$lt).format('DD/MM/YYYY H:mm')}`;
    }
    return value;
  }
  return filter.value;
};

export const timeOptions: TimeOptions[] = [
  { label: 'Last hour', value: 'last_hour' },
  { label: 'Last 4 hours', value: 'last_4_hours' },
  { label: 'Last 12 hours', value: 'last_12_hours' },
  { label: 'Last day', value: 'last_day' },
  { label: 'Last week', value: 'last_week' },
  { label: 'Last month', value: 'last_month' },
  { label: 'Last year', value: 'last_year' },
];

export const severityOptions: SeverityOptions[] = [
  { label: 'Info', value: 'Info' },
  { label: 'Attention', value: 'Attention' },
  { label: 'Error', value: 'Error' },
];

export type TimeValues =
  | 'last_hour'
  | 'last_4_hours'
  | 'last_12_hours'
  | 'last_day'
  | 'last_week'
  | 'last_month'
  | 'last_year'
  | {
      from: Date;
      to: Date;
    };
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
  value: any;
  onChange: (val: any) => void;
  setFilterValue: (val: any) => void;
  onSubmit: (e?: any) => void;
  closePopup?: () => void;
}
