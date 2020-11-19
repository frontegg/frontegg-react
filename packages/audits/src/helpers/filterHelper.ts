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

export const getFilterTime = (time: 'last_day' | 'last_week' | 'last_month' | 'last_year') => {
  let value;
  switch (time) {
    case 'last_day':
      value = moment().utc().subtract(1, 'days').toISOString();
      break;
    case 'last_week':
      value = moment().utc().subtract(7, 'days').toISOString();
      break;
    case 'last_month':
      value = moment().utc().subtract(30, 'days').toISOString();
      break;
    case 'last_year':
      value = moment().utc().subtract(365, 'days').toISOString();
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

export const getFilterValue = (filter: Filter | any) => {
  if (filter.key === 'createdAt') {
    console.log(filter.value);
    return moment(filter.value.$gt).format('YYYY/MM/DD h:mm A');
  }
  return filter.value;
};

export const timeOptions = [
  { label: 'Last Day', value: 'last_day' },
  { label: 'Last Week', value: 'last_week' },
  { label: 'Last Month', value: 'last_month' },
  { label: 'Last Year', value: 'last_year' },
];

export const severityOptions = [
  { label: 'Info', value: 'Info' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
  { label: 'Critical', value: 'Critical' },
];
