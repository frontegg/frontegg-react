import React, { FC, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { prefixCls } from './constants';
import { useAudits, useAuditsActions } from '../helpers/hooks';
import { getFilterName, getFilterValue } from '../helpers/filterHelper';
import { Icon, Input, Button, Tag, useDebounce, Menu, MenuItemProps } from '@frontegg/react-core';

export const AuditsSubHeader: FC = () => {
  const { filters } = useAudits();
  const firstRender = useRef<boolean>(true);
  // const { setFilterData, exportCSV, exportPDF } = useAuditsActions();
  const { setFilterData } = useAuditsActions();
  const [search, setSearch] = useState('');
  const searchValue = useDebounce(search, 500);

  // const downloadItems: MenuItemProps[] = useMemo(
  //   () => [
  //     {
  //       icon: <Icon name='pdf' />,
  //       iconClassName: 'fe-audits__subHeader-menuIcon',
  //       text: <div onClick={() => exportPDF()}>Download Pdf</div>,
  //     },
  //     {
  //       icon: <Icon name='csv' />,
  //       iconClassName: 'fe-audits__subHeader-menuIcon',
  //       text: <div onClick={() => exportCSV()}>Download Csv</div>,
  //     },
  //   ],
  //   [exportPDF, exportCSV]
  // );

  const handleSetFilterData = useCallback(() => {
    !!search.trim()
      ? setFilterData([...filters.filter((f) => f.key !== 'filter'), { key: 'filter', value: search }])
      : setFilterData([...filters.filter((f) => f.key !== 'filter')]);
  }, [searchValue]);

  useEffect(() => {
    firstRender.current ? (firstRender.current = false) : handleSetFilterData();
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
        {/*<Menu trigger={<Button size='small'>Download</Button>} items={downloadItems} />*/}
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
