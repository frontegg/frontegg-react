import React, { FC, useState } from 'react';
import { Table, Popup, Icon, Pagination, CellComponent } from '@frontegg/react-core';
import classNames from 'classnames';
import { prefixCls } from './Audits';

const pageSize = 2;

export const AuditsTableJson: FC<CellComponent | any> = (props) => {
  const { value } = props;
  const [state, setState] = useState({
    items: value.slice(0, pageSize),
    page: 1,
  });

  const { items, page } = state;
  const showPagination = value.length > pageSize;
  const totalPages = Math.ceil(value.length / pageSize);
  const showingItems = items.length >= 2 ? page * pageSize : page * pageSize - 1;

  const onPageChange = (pageNumber: number) => {
    setState({
      items: value.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
      page: pageNumber,
    });
  };

  return (
    value && (
      <Popup
        action='click'
        trigger={
          <div>
            {value.length} total <Icon className={`${prefixCls}__jsonMenu-icon`} name='list' />
          </div>
        }
        content={
          <div className={`${prefixCls}__jsonMenu`}>
            <div className={`${prefixCls}__jsonMenu-info`}>
              {value.length} total (showing {showingItems} out of {value.length})
            </div>
            {items.map((object: any, idx: number) =>
              typeof object === 'string' ? (
                <span key={idx} className={`${prefixCls}__jsonMenu-itemGroup ${prefixCls}__jsonMenu-itemGroup--string`}>
                  <div key={idx} className={`${prefixCls}__jsonMenu-item`}>
                    <span className={classNames(`${prefixCls}__jsonMenu-dash`)} />
                    <div className='jsonMenu__name'>{(page - 1) * pageSize + (idx + 1)}</div>
                    <div className={`${prefixCls}__jsonMenu-desc`}>{object}</div>
                  </div>
                </span>
              ) : (
                <span
                  key={idx}
                  className={classNames(`${prefixCls}__jsonMenu-itemGroup`, {
                    [`${prefixCls}__jsonMenu-border`]: items.length > 1,
                  })}
                >
                  {Object.keys(object).map((key) => {
                    return (
                      <div key={key} className={`${prefixCls}__jsonMenu-item`}>
                        <span className={classNames(`${prefixCls}__jsonMenu-dash`)} />
                        <div>
                          <div className={`${prefixCls}__jsonMenu-name`}>{key}</div>
                          <div className={`${prefixCls}__jsonMenu-desc`}>
                            {typeof object[key] === 'object' ? JSON.stringify(object[key]) : object[key]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </span>
              )
            )}
            {showPagination && (
              <div className={`${prefixCls}__jsonMenu-pagination`}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_e: any, v: number) => {
                    onPageChange(v);
                  }}
                />
              </div>
            )}
          </div>
        }
      />
    )
  );
};
