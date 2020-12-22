export interface InputChipProps {
  value?: string[];
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  error?: string;
  onChange?(value: string[]): void;
  label?: JSX.Element;
  validate?(newValu: string[]): Promise<boolean>;
}

export interface IInputChip extends Omit<InputChipProps, 'value' | 'onChange'> {
  inputValue: string;
  chips: string[];
  onDelete(idx: number): void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
}
