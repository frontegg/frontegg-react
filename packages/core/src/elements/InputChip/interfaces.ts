export interface InputChipProps {
  value?: string[];
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  onChange?(value: string[]): void;
  label?: JSX.Element;
}

export interface IInputChip extends Omit<InputChipProps, 'value' | 'onChange'> {
  inputValue: string;
  chips: string[];
  onDelete(idx: number): void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
}
