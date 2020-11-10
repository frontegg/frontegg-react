import React, { useMemo, useRef, useState } from 'react';
import classnames from 'classnames';
import { Input, useDebounce } from '..';

export interface IUseSearchProps<T> {
  data?: T[];
  filteredBy: keyof T;
  placeholder?: string; // the custom placeholder
  className?: string; // className for the root Element
  inputClassName?: string; // className for the input element
  debounce?: number; // the debounce before filter data
  callBack?(value: T, reg: RegExp): boolean; // If need filtered more than by one field
}

export function useSearch<T extends {}>({
  filteredBy,
  data,
  placeholder,
  className,
  inputClassName,
  debounce = 500,
  callBack,
}: IUseSearchProps<T>): [T[], JSX.Element] {
  const ref = useRef(null);
  const [filter, setFilter] = useState('');

  const filterDebounce = useDebounce(filter, debounce);

  const filteredData = useMemo(() => {
    const reg = new RegExp(filterDebounce.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    return data?.filter((el) => (callBack ? callBack(el, reg) : reg.test(`${el[filteredBy]}`))) ?? [];
  }, [filterDebounce, data]);

  const Search = useMemo(
    () => (
      <div className={classnames(className, 'fe-search')}>
        <Input
          className={inputClassName}
          placeholder={placeholder ?? 'Search by title...'}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>
    ),
    [filter]
  );

  return [filteredData, Search];
}
