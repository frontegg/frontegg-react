import React, { FC, useState, useEffect, useMemo, useRef, useCallback, ChangeEvent } from 'react';
import { prefixCls } from './constants';
import { useAuditsState, useAuditsActions } from '../helpers/hooks';
import { getFilterName, getFilterValue } from '../helpers/filterHelper';
import { Icon, Input, Button, Tag, useDebounce, Menu, MenuItemProps, Loader } from '@frontegg/react-core';
import { Filter } from '..';

export interface IAuditsSubHeader {
  filters?: Filter[];
  onSetFilter: (filters: Filter[]) => void;
  onDownloadPDF: () => void;
  onDownloadCSV: () => void;
  isDownloadingCsv: boolean;
  isDownloadingPdf: boolean;
}

export const AuditsSubHeader: FC<IAuditsSubHeader | {}> = (props) => {
  const prevSearch = useRef<{ search: string | null }>({ search: null });
  const { onSetFilter, onDownloadCSV, onDownloadPDF } = props as IAuditsSubHeader;

  const state = useAuditsState(({ filters, isDownloadingCsv, isDownloadingPdf }) => ({
    filters,
    isDownloadingCsv,
    isDownloadingPdf,
  }));

  const { filters, isDownloadingCsv, isDownloadingPdf } = useMemo(
    () => (props.hasOwnProperty('filters') ? (props as IAuditsSubHeader) : state),
    [state, props]
  );

  const { setFilterData, exportCSV, exportPDF } = useAuditsActions();

  const [search, setSearch] = useState('');
  const searchValue = useDebounce(search, 500);

  const filterOnly = useMemo(() => filters?.filter((f: any) => f.key !== 'filter') ?? [], [filters]);
  const handlerOnSetFilter = useCallback(
    (values) => {
      (onSetFilter ?? setFilterData)(values);
    },
    [onSetFilter, setFilterData]
  );

  const downloadItems: MenuItemProps[] = useMemo(
    () => [
      {
        icon: isDownloadingPdf ? <Loader /> : <Icon name='pdf' />,
        iconClassName: 'fe-audits__subHeader-menuIcon',
        text: <div onClick={onDownloadPDF ?? exportPDF}>Download Pdf</div>,
      },
      {
        icon: isDownloadingCsv ? <Loader /> : <Icon name='csv' />,
        iconClassName: 'fe-audits__subHeader-menuIcon',
        text: <div onClick={onDownloadCSV ?? exportCSV}>Download Csv</div>,
      },
    ],
    [exportPDF, exportCSV, onDownloadCSV, onDownloadPDF, isDownloadingPdf, isDownloadingCsv]
  );

  useEffect(() => {
    prevSearch.current.search !== null &&
      prevSearch.current.search !== searchValue &&
      handlerOnSetFilter([...filterOnly, { key: 'filter', value: searchValue.toLowerCase() }]);
    prevSearch.current.search = searchValue;
  }, [searchValue, handlerOnSetFilter, filterOnly, prevSearch]);

  const handlerSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const handlerCleanAll = useCallback(() => {
    handlerOnSetFilter(filters?.filter((f: any) => f.key === 'filter') ?? []);
  }, [handlerOnSetFilter, filters]);

  return (
    <div className={`${prefixCls}__subHeader`}>
      <div className={`${prefixCls}__subHeader-top`}>
        <Input
          data-test-id='search-box'
          type='search'
          value={search}
          placeholder='Search by any text'
          onChange={handlerSearch}
        />
        <Menu trigger={<Button size='small'>Download</Button>} items={downloadItems} />
      </div>
      {filters && !!filters.length && (
        <div className={`${prefixCls}__subHeader-filters`}>
          {filterOnly.map((f: any, idx: number) => (
            <Tag key={idx} className={`${prefixCls}__subHeader-tag`} variant='primary'>
              <b>{getFilterName(f)}:</b> {getFilterValue(f)}
              <Icon
                name='delete'
                size='small'
                onClick={() => handlerOnSetFilter(filters.filter((filter: any) => f.key !== filter.key))}
              />
            </Tag>
          ))}
          {filterOnly && filterOnly.length >= 2 && (
            <Button
              data-test-id='clearAll-btn'
              transparent
              size='small'
              className={`${prefixCls}__subHeader-clearAll`}
              onClick={handlerCleanAll}
            >
              clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
