export interface InputChipProps {
  value?: string[];
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  error?: string;
  onChange?(value: string[]): void;
  className?: string;
  label?: JSX.Element;
  validate?(newValue: string[]): Promise<boolean>;
}

export interface IInputChip extends Omit<InputChipProps, 'value' | 'onChange'> {
  inputValue: string;
  chips: string[];
  onDelete(idx: number): void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
}
