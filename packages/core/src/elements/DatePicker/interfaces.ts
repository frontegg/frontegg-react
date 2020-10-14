import { FormFieldProps } from '../../ElementsFactory';

export interface DatePickerProps extends FormFieldProps {
  label?: string;
  format?: string;
  withTime?: boolean;
  defaultValue?: Date;
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (date: Date) => void;
  fullWidth?: boolean;
}
