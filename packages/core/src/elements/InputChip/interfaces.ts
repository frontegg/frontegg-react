import { Ref } from 'react';

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
  ref?: Ref<HTMLInputElement> | null;
  chips: string[];
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
  onDelete(idx: number): void;
  onKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
}
