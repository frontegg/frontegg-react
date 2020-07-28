import React from 'react';

export interface ITabsProps {
  activeIndex: number;
  tabs: (string | React.ReactNode)[];
  onTabChange: (activeIndex: number) => void;
}
