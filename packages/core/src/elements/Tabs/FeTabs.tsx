import React from 'react';
import { TabProps } from './interfaces';
import classNames from 'classnames';
import './FeTabs.scss';

const clsPrefix = 'fe-core-tabs';

export const FeTabs = (props: TabProps) => {
  const { activeTab, items, onTabChange, disabledTabs } = props;
  return (
    <div className='fe-core-tabs'>
      <div className={`${clsPrefix}-menu`}>
        {items.map((i, idx) => (
          <Tab
            className={classNames(`${clsPrefix}-item`, {
              [`${clsPrefix}-item-active`]: activeTab === idx,
            })}
            idx={idx}
            onClick={onTabChange}
            disabled={!!disabledTabs?.includes(idx)}
            key={idx}
          >
            {React.createElement(i)}
          </Tab>
        ))}
      </div>
    </div>
  );
};

type TTab = {
  children: JSX.Element;
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
