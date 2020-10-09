export interface SelectProps {
  onChange: (e: Event, newValues: Array<any>) => void;
  value: Array<any>;
  options: Array<{
    label: string;
    key: string | number;
  }>;
}
