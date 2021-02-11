import React from 'react';
import { TabProps } from './interfaces';
import classNames from 'classnames';
import './FeTabs.scss';

const clsPrefix = 'fe-core-tabs';

export const FeTabs = (props: TabProps) => {
  const { activeTab, items, onTabChange } = props;

  return (
    <div className='fe-core-tabs'>
      <div className={`${clsPrefix}-menu`}>
        {items.map(({ disabled, Title }, idx) => (
          <Tab
            className={classNames(`${clsPrefix}-item`, {
              [`${clsPrefix}-item-active`]: activeTab === idx,
            })}
            idx={idx}
            onClick={onTabChange}
            disabled={disabled}
            key={idx}
          >
            {Title ?? ''}
          </Tab>
        ))}
      </div>
    </div>
  );
};

type TTab = {
  children: JSX.Element | string;
  className?: string;
  idx: number;
  disabled?: boolean;
  onClick: (e: any, activeTab: number) => void;
};

export const Tab = (props: TTab) => {
  const { children, className, onClick, idx, disabled } = props;
  return (
    <a onClick={(e) => onClick(e, idx)} className={classNames(className, { disabled })}>
      {children}
    </a>
  );
};
