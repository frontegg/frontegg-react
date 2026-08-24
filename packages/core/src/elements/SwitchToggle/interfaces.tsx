export interface SwitchToggleProps {
  name?: string;
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: boolean;
  labels?: [string, string];
  onChange?: (toggled: boolean) => void;
}
