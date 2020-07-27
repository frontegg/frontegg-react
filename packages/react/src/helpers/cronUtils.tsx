import React from 'react';
import moment from 'moment';
import cronParser from 'cron-parser';

export interface CronFields {
  intervalType: any;
  intervalCron: any;
  intervalDayInWeek: any;
  intervalDayInMonth: any;
  intervalHour: any;
  intervalMinutes: any;
}


export const INTERVAL_TYPE = [
  { text: 'Daily', value: 'daily' },
  { text: 'Weekly', value: 'weekly' },
  { text: 'Monthly', value: 'monthly' },
  { text: 'Custom', value: 'custom' },
];

export const INTERVAL_DAY_IN_WEEK = Array.apply(null, Array(7))
  .map((_, i) => moment(i, 'e').format('dddd'))
  .map((day, index) => ({ text: day, value: index + 1 }));

export const INTERVAL_DAY_IN_MONTH = Array.apply(null, Array(31)).map((_, i) => ({
  text: i + 1 > 28 ? <span>{`${i + 1}`} <span style={{ fontSize: 11, color: 'grey' }}>(not recommended)</span></span> : `${i + 1}`,
  value: i + 1,
}));

export const INTERVAL_HOURS = Array.apply(null, Array(24)).map((_, i) => ({ text: `${i}`, value: i }));

export const INTERVAL_MINUTES = Array.apply(null, Array(60)).map((_, i) => ({ text: `${i}`, value: i }));

export const DEFAULT_CRON = '0 0 12 * * 3';

export const cronToFields = (cronParam: string = DEFAULT_CRON, cronType?: string): CronFields => {
  let cron;
  const cronStr = cronParam;
  try {
    cron = cronParser.parseExpression(cronStr);
  } catch (e) {
    // default
    cron = cronParser.parseExpression(DEFAULT_CRON);
  }
  let { minute, hour, dayOfWeek, dayOfMonth, month } = (cron as any)._fields;

  let intervalType: any = INTERVAL_TYPE[1];
  let intervalDayInWeek: any = INTERVAL_DAY_IN_WEEK[0];
  let intervalDayInMonth: any = INTERVAL_DAY_IN_MONTH[0];
  let intervalHour: any = INTERVAL_HOURS[11];
  let intervalMinutes: any = INTERVAL_MINUTES[0];
  if (
    cronType === 'custom' ||
    month.length !== 12 ||
    minute.length !== 1 ||
    hour.length !== 1 ||
    cronStr.lastIndexOf('* * * * *') === cronStr.length - 9
  ) {
    intervalType = INTERVAL_TYPE[3]; // 'custom';
  } else {
    intervalType = INTERVAL_TYPE[0]; // 'daily';
    intervalHour = INTERVAL_HOURS[hour[0]];
    intervalMinutes = INTERVAL_MINUTES[minute[0]];
    if (dayOfMonth.length !== 31) {
      if (dayOfMonth.length === 1) {
        intervalType = INTERVAL_TYPE[2]; // 'monthly';
        intervalDayInMonth = INTERVAL_DAY_IN_MONTH[dayOfMonth[0] - 1];
      } else {
        intervalType = INTERVAL_TYPE[3]; // 'custom';
      }
    } else {
      if (dayOfWeek.length !== 8) {
        if (dayOfWeek.length === 1) {
          intervalType = INTERVAL_TYPE[1]; // 'weekly';
          intervalDayInWeek = INTERVAL_DAY_IN_WEEK[dayOfWeek[0] - 1];
        } else {
          intervalType = INTERVAL_TYPE[3]; // 'custom';
        }
      }
    }
  }

  return {
    intervalType:intervalType.value,
    intervalCron: cronStr,
    intervalDayInWeek: intervalDayInWeek.value,
    intervalDayInMonth: intervalDayInMonth.value,
    intervalHour: intervalHour.value,
    intervalMinutes: intervalMinutes.value,
  };
};

export const fieldsToCron = ({ intervalType, intervalCron, intervalDayInWeek, intervalDayInMonth, intervalHour, intervalMinutes }: CronFields) => {
  switch (intervalType) {
    case 'daily':
      return `0 ${intervalMinutes} ${intervalHour} * * *`;
    case 'weekly':
      return `0 ${intervalMinutes} ${intervalHour} * * ${intervalDayInWeek}`;
    case 'monthly':
      return `0 ${intervalMinutes} ${intervalHour} ${intervalDayInMonth} * *`;
    case 'custom':
      return intervalCron;
  }
};
