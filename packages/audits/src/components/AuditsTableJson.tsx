import React, { FC, useState } from 'react';
import { Table, Popup, Icon } from '@frontegg/react-core';
import classNames from 'classnames';
import { prefixCls } from './Audits';
import { AuditsTableIpCell } from './AuditsTableIpCell';

export interface AuditsTableJsonProps {
  json: {}[];
}

const pageSize = 2;

export const AuditsTableJson: FC<AuditsTableJsonProps> = ({ json }) => {
  const [state, setState] = useState({
    items: json.slice(0, pageSize),
    totalPages: Math.ceil(json.length / 2),
  });
  console.log(json);

  const { items, totalPages } = state;
  const showPagination = json.length > pageSize;

  return (
    <Popup
      action='click'
      trigger={
        <>
          {json.length} total <Icon name='filters' />
        </>
      }
      content={
        <div>
          {items.map((object: any, idx) =>
            typeof object === 'string' ? (
              <span key={idx} className={`${prefixCls}__jsonMenu-itemGroup ${prefixCls}__jsonMenu-itemGroup--string`}>
                <span key={idx} className={`${prefixCls}__jsonMenu-item`}>
                  {/* <p className='jsonMenu__name'>{(activePage - 1) * pageSize + (idx + 1)}</p> */}
                  <p className={`${prefixCls}__jsonMenu-desc`}>{object}</p>
                </span>
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
                    <span key={key} className={`${prefixCls}__jsonMenu-item`}>
                      <div className={`${prefixCls}__jsonMenu-name`}>{key}</div>
                      <div className={`${prefixCls}__jsonMenu-desc`}>
                        {typeof object[key] === 'object' ? JSON.stringify(object[key]) : object[key]}
                      </div>
                    </span>
                  );
                })}
              </span>
            )
          )}
        </div>
      }
    />
  );
};
