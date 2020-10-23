import React, { FC, useMemo, cloneElement, MouseEvent, ComponentType, ReactNode } from 'react';
import { TabProps } from './interfaces';
import classNames from 'classnames';
import './FeTabs.scss';

const clsPrefix = 'fe-core-tabs';

export const FeTabs = (props: TabProps) => {
  const { activeTab, items, onTabChange } = props;

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
  onClick: (e: any, activeTab: number) => void;
};

export const Tab = (props: TTab) => {
  const { children, className, onClick, idx } = props;
  return (
    <a onClick={(e) => onClick(e, idx)} className={className}>
      {children}
    </a>
  );
};
