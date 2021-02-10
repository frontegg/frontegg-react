export interface TabProps {
  className?: string;
  items: TabItem[];
  activeTab: number;
  onTabChange: (event: React.MouseEvent<HTMLDivElement>, activeIndex: number) => void;
}

export interface TabItem {
  disabled?: boolean;
  Title?: JSX.Element | string;
}
