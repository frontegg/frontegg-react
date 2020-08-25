/// <reference types="react" />
export interface CronFields {
    intervalType: any;
    intervalCron: any;
    intervalDayInWeek: any;
    intervalDayInMonth: any;
    intervalHour: any;
    intervalMinutes: any;
}
export declare const INTERVAL_TYPE: {
    text: string;
    value: string;
}[];
export declare const INTERVAL_DAY_IN_WEEK: {
    text: string;
    value: number;
}[];
export declare const INTERVAL_DAY_IN_MONTH: {
    text: string | JSX.Element;
    value: number;
}[];
export declare const INTERVAL_HOURS: {
    text: string;
    value: number;
}[];
export declare const INTERVAL_MINUTES: {
    text: string;
    value: number;
}[];
export declare const DEFAULT_CRON = "0 0 12 * * 3";
export declare const cronToFields: (cronParam?: string, cronType?: string | undefined) => CronFields;
export declare const fieldsToCron: ({ intervalType, intervalCron, intervalDayInWeek, intervalDayInMonth, intervalHour, intervalMinutes }: CronFields) => any;
