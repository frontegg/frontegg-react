import React, { FC, useState, useEffect } from 'react';
import { prefixCls } from './Audits';
import { useAudits } from '../helpers/hooks';
import { Icon, Input, Button, Tag, useDebounce, Menu, MenuItemProps } from '@frontegg/react-core';
import { getFilterName, getFilterValue } from '../helpers/filterHelper';

const downloadItems: MenuItemProps[] = [
  { icon: 'pdf', iconClassName: 'fe-audits__subHeader-menuIcon', text: <div>Download Pdf</div> },
  { icon: 'csv', iconClassName: 'fe-audits__subHeader-menuIcon', text: <div>Download Csv</div> },
];

export const AuditsSubHeader: FC = () => {
  const { filters, setFilterData } = useAudits();
  const [search, setSearch] = useState('');
  const searchValue = useDebounce(search, 400);

  useEffect(() => {
    if (!!search.trim()) {
      setFilterData([...filters.filter((f) => f.key !== 'filter'), { key: 'filter', value: search }]);
    }
  }, [searchValue]);

  return (
    <div className={`${prefixCls}__subHeader`}>
      <div className={`${prefixCls}__subHeader-top`}>
        <Input
          type='text'
          value={search}
          placeholder='Search by any text'
          prefixIcon={<Icon name='search' />}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Menu trigger={<Button size='small'>Download</Button>} items={downloadItems} />
      </div>
      {filters && !!filters.length && (
        <div className={`${prefixCls}__subHeader-filters`}>
          {filters
            .filter((f) => f.key !== 'filter')
            .map((f, idx) => (
              <Tag key={idx} className={`${prefixCls}__subHeader-tag`} variant='primary'>
                <b>{getFilterName(f)}:</b> {getFilterValue(f)}
                <Icon
                  name='delete'
                  size='small'
                  onClick={() => setFilterData(filters.filter((filter) => f.key !== filter.key))}
                />
              </Tag>
            ))}
          {filters && filters.filter((f) => f.key !== 'filter').length >= 2 && (
            <Button
              transparent
              size='small'
              className={`${prefixCls}__subHeader-clearAll`}
              onClick={() => setFilterData(filters.filter((f) => f.key === 'filter'))}
            >
              clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
