import React, { FC, useState } from 'react';
import { prefixCls } from './Audits';
import { useAudits } from '../helpers/hooks';
import { Icon, Input, Button, Tag } from '@frontegg/react-core';
import { getFilterName, getFilterValue } from '../helpers/filterHelper';

export const AuditsSubHeader: FC = () => {
  const { filters, setFilterData } = useAudits();
  const [search, setSearch] = useState('');

  return (
    <div className={`${prefixCls}__subHeader`}>
      <div className={`${prefixCls}__subHeader-top`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if(!!search.trim()) {
              setFilterData([...filters.filter(f => f.key !== 'Search'), { key: 'Search', value: search }]);
            }
          }}
        >
          <span>
            <Input
              type='text'
              value={search}
              placeholder='Search by any text'
              prefixIcon={<Icon name='search' />}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit' />
          </span>
        </form>
        <Button>
          Download <Icon name='down-arrow' />
        </Button>
      </div>
      {filters && !!filters.length && (
        <div className={`${prefixCls}__subHeader-filters`}>
          {filters.map((f, idx) => (
            <Tag key={idx} className={`${prefixCls}__subHeader-tag`} variant='primary'>
              {getFilterName(f)}: {getFilterValue(f)}
              <Icon
                name='delete'
                size='small'
                onClick={() => setFilterData(filters.filter((filter) => f.key !== filter.key))}
              />
            </Tag>
          ))}
          {filters && filters.length >= 2 && (
            <Tag variant='primary' className={`${prefixCls}__subHeader-clearAll`} onClick={() => setFilterData(null)}>
              clear all
            </Tag>
          )}
        </div>
      )}
    </div>
  );
};
