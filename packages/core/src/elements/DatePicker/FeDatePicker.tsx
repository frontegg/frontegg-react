import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerProps } from './interfaces';
import './FeDatePicker.scss';
import moment from 'moment';
import { FeIcon } from '../Icon/FeIcon';

export const FeDatePicker = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const { label, defaultValue, value, fullWidth, withTime, format, ...restProps } = props;
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const setDate = (date: Date | undefined) => {
    if (value && date) {
      value.setTime(date.getTime());
    }
    setSelectedDate(date);
  };

  const header = (data: any) => {
    const { date, decreaseMonth, increaseMonth } = data;
    const momentDate = moment(date);
    return (
      <div className='fe-datepicker__header'>
        <FeIcon name='left-arrow' onClick={decreaseMonth} className='fe-datepicker__arrow' />
        <label className='fe-date'>{momentDate.format('MMMM YYYY')}</label>
        <FeIcon name='right-arrow' onClick={increaseMonth} className='fe-datepicker__arrow' />
      </div>
    );
  };

  const CustomTimeInput = (data: any) => {
    const { date } = data;
    const momentDate = moment(date);

    return <div className='fe-datepicker__row fe-datepicker-full-width'></div>;
  };

  return (
    <div className={fullWidth ? 'fe-datepicker-full-width' : ''}>
      <label>{label}</label>
      <DatePicker
        dateFormat={format}
        showTimeInput={withTime}
        customTimeInput={<CustomTimeInput />}
        showPopperArrow={false}
        renderCustomHeader={(data) => header(data)}
        calendarClassName='fe-calendar'
        className='fe-datepicker'
        selected={selectedDate}
        onChange={(date) => setDate(date as Date)}
        {...restProps}
      />
    </div>
  );
});
