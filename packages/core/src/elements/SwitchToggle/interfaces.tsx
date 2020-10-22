export interface SwitchToggleProps {
  loading?: boolean;
  disabled?: boolean;
  value?: boolean;
  labels?: [string, string];
  onChange?: (toggled: boolean) => void;
}
