import React, { FC, useCallback, useState } from 'react';
import { Input, Button, useT, Grid, Select } from '@frontegg/react-core';
import { getFilterType, getFilterTime, timeOptions, severityOptions } from '../helpers/filterHelper';
import { prefixCls } from './Audits';

export interface FilterProps {
  name: string;
  type: string;
  value: string | number;
  closePopup: (() => void) | undefined;
  setFilterValue: (value: any) => void;
}

export const Filter: FC<FilterProps> = ({ closePopup, value, setFilterValue, type, name }) => {
  const { t } = useT();
  const [inputState, setInputState] = useState<string | number>(value);
  const [timeSelectState, setTimeSelectState] = useState<any>(timeOptions[0]);
  const [severitySelectState, setSeveritySelectState] = useState<any>(severityOptions[0]);

  const filter = useCallback(() => {
    switch (type) {
      case 'Timestamp':
        return (
          <Select
            fullWidth
            size='small'
            placeholder='select'
            value={timeSelectState}
            onChange={(_e, newValues) => {
              setTimeSelectState(newValues);
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
            value={severitySelectState}
            onChange={(_e, newValues) => {
              setSeveritySelectState(newValues);
            }}
            options={severityOptions}
          />
        );
      default:
        return (
          <Input
            fullWidth
            label={`Filter by ${name}`}
            onChange={(e) => setInputState(e.target.value)}
            value={`${inputState ?? ''}`}
          />
        );
    }
  }, [type, setInputState, inputState, setTimeSelectState, timeSelectState]);

  const handleFilter = useCallback(() => {
    getFilterType(type) === 'input'
      ? inputState && setFilterValue(inputState)
      : setFilterValue(type === 'Timestamp' ? getFilterTime(timeSelectState.value) : severitySelectState.value);
  }, [type, setFilterValue, inputState, severitySelectState, timeSelectState]);

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

        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Button
              fullWidth
              onClick={() => {
                setFilterValue(null);
                closePopup?.();
              }}
            >
              {t('common.cancel')}
            </Button>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={5}>
            <Button type='submit' fullWidth variant='primary'>
              {t('common.filter')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
