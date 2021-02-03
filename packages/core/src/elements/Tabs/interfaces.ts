import { ComponentType } from 'react';

export interface TabProps {
  className?: string;
  items: ComponentType[];
  activeTab: number;
  disabledTabs?: number[];
  onTabChange: (event: React.MouseEvent<HTMLDivElement>, activeIndex: number) => void;
}
