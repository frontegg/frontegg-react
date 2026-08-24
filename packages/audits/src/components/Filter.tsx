import React, { FC, useCallback, useState, useEffect, useMemo } from 'react';
import { Input, Button, useT, Grid, Select } from '@frontegg/react-core';
import './datepicker.scss';
import {
  getFilterType,
  getFilterTime,
  timeOptions,
  severityOptions,
  getTimeDiff,
  TimeOptions,
  SeverityOptions,
  FProps,
} from '../helpers/filterHelper';
import DatePicker from 'react-datepicker';
import { prefixCls } from './constants';
import moment from 'moment';

export interface FilterProps {
  name: string;
  type: string;
  value: any;
  closePopup: (() => void) | undefined;
  setFilterValue: (value: any) => void;
}

const AlphaNumericFilter: FC<FProps> = ({ value, onChange }) => {
  const [inputState, setInputState] = useState<string>(`${value ?? ''}`);

  return (
    <Input
      autoFocus
      fullWidth
      label={`Filter by ${name}`}
      onChange={(e) => {
        setInputState(e.target.value);
        onChange(e.target.value);
      }}
      value={`${inputState ?? ''}`}
    />
  );
};

const SeverityFilter: FC<FProps> = ({ value, onChange }) => {
  const [selectState, setSelectState] = useState<SeverityOptions>(severityOptions[0]);

  useEffect(() => {
    onChange(selectState.value);
    if (value) {
      setSelectState(severityOptions.filter((o) => o.value === value)[0]);
    }
  }, []);

  const handleSelect = useCallback(
    (value) => {
      setSelectState(value);
      onChange(value.value);
    },
    [setSelectState, onChange]
  );

  return (
    <Select
      fullWidth
      size='small'
      placeholder='select'
      value={selectState}
      disableMenuPortalTarget
      onChange={(_e, newValues) => handleSelect(newValues)}
      options={severityOptions}
    />
  );
};

const TimeStampFilter: FC<FProps> = (props) => {
  const { value, onChange, setFilterValue, closePopup } = props;

  const [startDate, setStartDate] = useState<Date | null>(value?.$gt ? new Date(value?.$gt) : null);
  const [endDate, setEndDate] = useState<Date | null>(value?.$lt ? new Date(value?.$lt) : null);

  const [startTime, setStartTime] = useState<string>(startDate ? moment(startDate).format('HH:mm') : '00:00');
  const [endTime, setEndTime] = useState<string>(endDate ? moment(endDate).format('HH:mm') : '23:59');

  const onDateChange = useCallback(
    (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;
      setStartTime('00:00');
      setEndTime('23:59');
      setStartDate(start);
      setEndDate(end);
      if (start && end) {
        start.setHours(0, 0);
        end.setHours(23, 59);
        onChange(getFilterTime({ from: start, to: end }));
      }
    },
    [setStartDate, setEndDate]
  );

  return (
    <>
      <div className={`${prefixCls}__filter-title`}>Quick selection</div>
      <div className={`${prefixCls}__time-filter-container`}>
        {timeOptions.map((option) => {
          return (
            <Button
              transparent
              variant='primary'
              key={`${option.value}`}
              onClick={() => {
                setFilterValue(getFilterTime(option.value));
                closePopup?.();
              }}
            >
              {option.label}
            </Button>
          );
        })}
      </div>

      <div className={`${prefixCls}__filter-title fe-mt-8`} style={{ marginTop: '8px' }}>
        Range selection
      </div>

      <DatePicker
        selected={startDate}
        onChange={onDateChange}
        startDate={startDate}
        endDate={endDate}
        maxDate={new Date()}
        selectsRange
        inline
        closeOnScroll={false}
      />
      {startDate && endDate ? (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Input
            label='Start time'
            style={{ width: 120 }}
            value={startTime}
            onBlur={(e) => {
              const timeValue = e.target.value;
              let [hours, minutes] = timeValue.split(':');
              if (!hours) {
                hours = '0';
              }
              if (!minutes) {
                minutes = '0';
              }
              const newDate = new Date(startDate ?? new Date());
              newDate.setHours(Number(hours), Number(minutes));
              setStartTime(moment(newDate).format('HH:mm'));
              onChange(getFilterTime({ from: newDate, to: endDate ?? new Date() }));
            }}
            onChange={(e) => {
              const timeValue = e.target.value;
              if (/^\d{1,2}:\d{2}$/.test(timeValue)) {
                const [hours = '0', minutes = '0'] = timeValue.split(':');
                const newDate = new Date(startDate ?? new Date());
                newDate.setHours(Number(hours), Number(minutes));
                setStartTime(moment(newDate).format('HH:mm'));
                onChange(getFilterTime({ from: newDate, to: endDate ?? new Date() }));
              } else if (/^[\d:]+$/.test(timeValue) || timeValue === '') {
                const date = new Date(startDate ?? new Date());
                if (date?.setHours(11, 20)) {
                  setStartTime(timeValue);
                }
              }
            }}
          />
          <Input
            label='End time'
            style={{ width: 120 }}
            value={endTime}
            onBlur={(e) => {
              const timeValue = e.target.value;
              let [hours, minutes] = timeValue.split(':');
              if (!hours) {
                hours = '23';
              }
              if (!minutes) {
                minutes = '59';
              }
              const newDate = new Date(endDate ?? new Date());
              newDate.setHours(Number(hours), Number(minutes));
              setEndTime(moment(newDate).format('HH:mm'));
              onChange(getFilterTime({ from: startDate ?? new Date(), to: newDate }));
            }}
            onChange={(e) => {
              const timeValue = e.target.value;
              if (/^\d{1,2}:\d{2}$/.test(timeValue)) {
                const [hours = '0', minutes = '0'] = timeValue.split(':');
                const newDate = new Date(endDate ?? new Date());
                newDate.setHours(Number(hours), Number(minutes));
                setEndTime(moment(newDate).format('HH:mm'));
                onChange(getFilterTime({ from: startDate ?? new Date(), to: newDate }));
              } else if (/^[\d:]+$/.test(timeValue) || timeValue === '') {
                const date = new Date(endDate ?? new Date());
                if (date?.setHours(11, 20)) {
                  setEndTime(timeValue);
                }
              }
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export const Filter: FC<FilterProps> = ({ closePopup, value, setFilterValue, type, name }) => {
  const { t } = useT();
  const [state, setState] = useState<any>('');

  const FilterComponent = useMemo(() => {
    switch (type) {
      case 'Timestamp':
        return TimeStampFilter;
      case 'Severity':
        return SeverityFilter;
      default:
        return AlphaNumericFilter;
    }
  }, [type, value, setState]);

  const handleFilter = useCallback(() => {
    if (getFilterType(type) === 'input') {
      return !!state.trim() && setFilterValue(state);
    } else {
      setFilterValue(state);
    }
  }, [type, state]);

  const onSubmit = useCallback(
    (e) => {
      e?.preventDefault?.();
      handleFilter();
      closePopup?.();
    },
    [handleFilter, closePopup]
  );

  return (
    <div className={`${prefixCls}__filter`}>
      <form onSubmit={onSubmit}>
        {type !== 'Timestamp' && <div className={`${prefixCls}__filter-title`}>Filter by {name}</div>}

        <div className={`${prefixCls}__filter-main`}>
          <FilterComponent
            value={value}
            onChange={(value) => setState(value)}
            onSubmit={onSubmit}
            closePopup={closePopup}
            setFilterValue={setFilterValue}
          />
        </div>
        <hr className={`${prefixCls}__filter-border`} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={() => {
                value && setFilterValue(null);
                closePopup?.();
              }}
              data-test-id='closePopup-btn'
            >
              {value ? t('common.clear') : t('common.cancel')}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type='submit' fullWidth variant='primary' data-test-id='submit-btn'>
              {t('common.filter')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
