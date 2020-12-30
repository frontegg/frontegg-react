import React, { FC, useCallback, useState, useEffect } from 'react';
import { Input, Button, useT, Grid, Select } from '@frontegg/react-core';
import {
  getFilterType,
  getFilterTime,
  timeOptions,
  severityOptions,
  getTimeDiff,
  TimeOptions,
  SeverityOptions,
  FProps,
  TimeValues,
} from '../helpers/filterHelper';
import { prefixCls } from './constants';

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

const TimeStampFilter: FC<FProps> = ({ value, onChange }) => {
  const [selectState, setSelectState] = useState<TimeOptions>(timeOptions[0]);

  useEffect(() => {
    onChange(selectState.value);
    if (value) {
      setSelectState(timeOptions.filter((o) => o.value === getTimeDiff(value))[0]);
    }
  }, []);

  const handleSelect = useCallback((value) => {
    setSelectState(value);
    onChange(value.value);
  }, []);

  return (
    <Select
      fullWidth
      size='small'
      placeholder='select'
      value={selectState}
      disableMenuPortalTarget
      onChange={(_e, newValues) => handleSelect(newValues)}
      options={timeOptions}
    />
  );
};

export const Filter: FC<FilterProps> = ({ closePopup, value, setFilterValue, type, name }) => {
  const { t } = useT();
  const [state, setState] = useState<string>('');

  const filter = useCallback(() => {
    switch (type) {
      case 'Timestamp':
        return <TimeStampFilter value={value} onChange={(value) => setState(value)} />;
      case 'Severity':
        return <SeverityFilter value={value} onChange={(value) => setState(value)} />;
      default:
        return <AlphaNumericFilter value={value} onChange={(value) => setState(value)} />;
    }
  }, [type, value]);

  const handleFilter = useCallback(
    () =>
      getFilterType(type) === 'input'
        ? !!state.trim() && setFilterValue(state)
        : setFilterValue(type === 'Timestamp' ? getFilterTime(state as TimeValues) : state),
    [type, state]
  );

  return (
    <div className={`${prefixCls}__filter`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFilter();
          closePopup?.();
        }}
      >
        <div className={`${prefixCls}__filter-title`}>Filter by {name}</div>

        <div className={`${prefixCls}__filter-main`}>{filter()}</div>
        <hr className={`${prefixCls}__filter-border`} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={() => {
                value && setFilterValue(null);
                closePopup?.();
              }}
              data-test-id="closePopup-btn"
            >
              {value ? t('common.clear') : t('common.cancel')}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type='submit' fullWidth variant='primary' data-test-id="submit-btn">
              {t('common.filter')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
