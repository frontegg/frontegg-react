import React, { FC } from 'react';
import { FeIcon } from '../Icon/FeIcon';
import { FeButton } from '../Button/FeButton';
import classNames from 'classnames';
import { PaginationProps } from './interfaces';
import './FePagination.scss';

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

export const FePagination: FC<PaginationProps> = (props) => {
  const { count, onChange, page } = props;
  const canPreviousPage = page >= 1;
  const canNextPage = page < count;
  const pageOptions = Array.from(new Array(count), (x, index) => index + 1);

  if (count < 5) {
    return (
      <div className='fe-table__pagination'>
        <FeButton disabled={!canPreviousPage} onClick={(e) => onChange(e, page - 1)} data-test-id='leftArrow-btn'>
          <FeIcon name='left-arrow' />
        </FeButton>
        {pageOptions.map((p) => {
          return (
            <div
              key={p}
              className={classNames('fe-table__pagination-option', {
                'selected-option': p === page,
              })}
              onClick={(e) => onChange(e, p)}
            >
              {p}
            </div>
          );
        })}
        <FeButton disabled={!canNextPage} onClick={(e) => onChange(e, page + 1)} data-test-id='RightArrow-btn'>
          <FeIcon name='right-arrow' />
        </FeButton>
      </div>
    );
  }

  const pageButtons: number[] = [page];
  if (page < 5) {
    pageButtons.push(0, 1, 2, 3);
  } else {
    pageButtons.push(0, page - 2, page - 1);
  }
  if (page > count - 5) {
    pageButtons.push(count - 4, count - 3, count - 2, count - 1);
  } else {
    pageButtons.push(count - 1, page + 1, page + 2);
  }
  const pageChunks = generatePageButtons(pageButtons);

  return (
    <div className='fe-pagination'>
      <FeButton disabled={canPreviousPage} onClick={(e) => onChange(e, page - 1)} data-test-id='leftArrow-btn'>
        <FeIcon name='left-arrow' />
      </FeButton>
      {pageChunks.map((pageChunk, index) => {
        return (
          <React.Fragment key={index}>
            {pageChunk.map((p) => {
              return (
                <div
                  key={p}
                  className={classNames('fe-pagination-option', {
                    'selected-option': page === pageOptions[p],
                  })}
                  onClick={(e) => onChange(e, pageOptions[p])}
                >
                  {pageOptions[p]}
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
      <FeButton disabled={canNextPage} onClick={(e) => onChange(e, page + 1)} data-test-id='rightArrow-btn'>
        <FeIcon name='right-arrow' />
      </FeButton>
    </div>
  );
};
