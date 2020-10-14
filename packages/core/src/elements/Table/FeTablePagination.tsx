import React, { FC } from 'react';
import { Row } from 'react-table';
import { FeIcon } from '../Icon/FeIcon';
import { FeButton } from '../Button/FeButton';
import classNames from 'classnames';

export type FeTablePaginationProps<T extends object> = {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  pageOptions: number[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
  previousPage: () => void;
  nextPage: () => void;
  setPageSize: (pageSize: number) => void;
};

const generatePageButtons = (pageOptions: number[]) => {
  return pageOptions
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce(
      (memo: number[][], item: number) => {
        const lastArray = memo[memo.length - 1];
        const lastItem = lastArray[lastArray.length - 1];
        if (item - lastItem === 1) {
          lastArray.push(item);
        } else {
          memo.push([item]);
        }
        return memo;
      },
      [[]]
    )
    .filter((arr) => arr.length > 0);
};
export const FeTablePagination: FC<FeTablePaginationProps<any>> = <T extends object>(
  props: FeTablePaginationProps<T>
) => {
  const { pageIndex, pageCount, canPreviousPage, canNextPage, pageOptions, nextPage, previousPage } = props;
  // if total pages more less 10
  //  - display all numbers
  // if more than 10
  //  - if -3 < 1
  //    - display 1 2 [3] 4 5 ... {max-page}
  //  - if +3 > max-page
  //    - display 0 ... x-1 x-2 [x] {max-page}-2  {max-page}-1 {max-page}

  if (pageOptions.length < 2) {
    return null;
  }

  if (pageCount < 10) {
    return (
      <div className='fe-table__pagination'>
        <FeButton disabled={!canPreviousPage} onClick={previousPage}>
          <FeIcon name='left-arrow' />
        </FeButton>
        {pageOptions.map((page) => {
          return (
            <div
              key={page}
              className={classNames('fe-table__pagination-option', {
                'selected-option': page === pageIndex,
              })}
              onClick={() => props.gotoPage(page)}
            >
              {page + 1}
            </div>
          );
        })}
        <FeButton disabled={!canNextPage} onClick={nextPage}>
          <FeIcon name='right-arrow' />
        </FeButton>
      </div>
    );
  }
  const pageButtons: number[] = [pageIndex];
  if (pageIndex < 5) {
    pageButtons.push(0, 1, 2, 3);
  } else {
    pageButtons.push(0, pageIndex - 2, pageIndex - 1);
  }
  if (pageIndex > pageCount - 5) {
    pageButtons.push(pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1);
  } else {
    pageButtons.push(pageCount - 1, pageIndex + 1, pageIndex + 2);
  }
  const pageChunks = generatePageButtons(pageButtons);

  return (
    <div className='fe-table__pagination'>
      <FeButton disabled={!canPreviousPage} onClick={previousPage}>
        <FeIcon name='left-arrow' />
      </FeButton>
      {pageChunks.map((pageChunk, index) => {
        return (
          <React.Fragment key={index}>
            {pageChunk.map((page) => {
              return (
                <div
                  key={page}
                  className={classNames('fe-table__pagination-option', {
                    'selected-option': page === pageIndex,
                  })}
                  onClick={() => props.gotoPage(page)}
                >
                  {page + 1}
                </div>
              );
            })}
            {index !== pageChunks.length - 1 && (
              <div key='page-separator' className='page-separator'>
                ...
              </div>
            )}
          </React.Fragment>
        );
      })}
      <FeButton disabled={!canNextPage} onClick={nextPage}>
        <FeIcon name='right-arrow' />
      </FeButton>
    </div>
  );
};
