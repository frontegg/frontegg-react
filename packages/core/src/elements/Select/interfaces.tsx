import { ReactNode } from 'react';
import { Size, Theme } from '../../styles';

export interface SelectOptionProps<T> {
  label: string;
  value: T;
  // key: string | number; // REMOVE: use value as key for semantic
}

export interface StateProps {
  selected: boolean;
  index: number;
  disabled: boolean;
}

export interface SelectProps<T = any> {
  value: T[];
  label?: string;
  onChange: (e: Event, newValues: T[]) => void;
  options: SelectOptionProps<T>[];
  multiselect?: boolean; // for multi select
  loading?: boolean; // for async loading options
  getOptionLabel?: (option: SelectOptionProps<T>) => string; // used to render options inside the input
  renderOption?: (option: SelectOptionProps<T>, state: StateProps) => ReactNode; // used to render options inside the dropdown

  // if we have open property, we will should the dropdown only if open is true,
  // if we dont have open property, we will use local component state
  open?: boolean; // used for controll open/close dropdown
  onOpen?: () => void; // used for notify open change
  onClose?: () => void; // used for notify close change

  noOptionsText?: string; // used for empty rows
  loadingText?: string; // used for display loading row in menu

  // input props
  size?: Size;
  theme?: Theme;
}

// const props = {
//   options: [{label:'MAx', value:'max' }],
//   renderOption: (value, state)=>{
//     state.selected
//     state.index
//     state.disabled
//   }
// }
