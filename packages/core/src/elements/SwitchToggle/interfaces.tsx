export interface SwitchToggleProps {
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: boolean;
  labels?: [string, string];
  onChange?: (toggled: boolean) => void;
}
