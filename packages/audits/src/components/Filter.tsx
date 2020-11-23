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
} from '../helpers/filterHelper';
import { prefixCls } from './Audits';

export interface FilterProps {
  name: string;
  type: string;
  value: any;
  closePopup: (() => void) | undefined;
  setFilterValue: (value: any) => void;
}

interface SelectState {
  time: TimeOptions;
  severity: SeverityOptions;
}

export const Filter: FC<FilterProps> = ({ closePopup, value, setFilterValue, type, name }) => {
  const { t } = useT();
  const [inputState, setInputState] = useState<string>(`${value ?? ''}`);
  const [selectState, setSelectState] = useState<SelectState>({
    time: timeOptions[0],
    severity: severityOptions[0],
  });

  useEffect(() => {
    if (value) {
      type === 'Severity' ? setSelectState({ ...selectState, severity: { label: value, value } }) : null;
      type === 'Timestamp'
        ? setSelectState({ ...selectState, time: timeOptions.filter((o) => o.value === getTimeDiff(value.$gt))[0] })
        : null;
    }
  }, []);

  const filter = useCallback(() => {
    switch (type) {
      case 'Timestamp':
        return (
          <Select
            fullWidth
            size='small'
            placeholder='select'
            value={selectState.time}
            onChange={(_e, newValues) => {
              //@ts-ignore
              setSelectState({ time: newValues });
            }}
            options={timeOptions}
          />
        );
      case 'Severity':
        return (
          <Select
            fullWidth
            size='small'
            placeholder='select'
            value={selectState.severity}
            onChange={(_e, newValues) => {
              //@ts-ignore
              setSelectState(newValues);
            }}
            options={severityOptions}
          />
        );
      default:
        return (
          <Input
            autoFocus
            fullWidth
            label={`Filter by ${name}`}
            onChange={(e) => setInputState(e.target.value)}
            value={`${inputState ?? ''}`}
          />
        );
    }
  }, [type, inputState, setInputState, selectState, setSelectState]);

  const handleFilter = useCallback(
    () =>
      getFilterType(type) === 'input'
        ? !!inputState.trim() && setFilterValue(inputState)
        : setFilterValue(type === 'Timestamp' ? getFilterTime(selectState.time.value) : selectState.severity.value),
    [type, inputState, selectState]
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
                setFilterValue(null);
                closePopup?.();
              }}
            >
              {value ? t('common.clear') : t('common.cancel')}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type='submit' fullWidth variant='primary'>
              {t('common.filter')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
