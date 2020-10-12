import React, { forwardRef, useCallback, useState } from 'react';
import { SelectProps, SelectOptionProps } from './interfaces';
import Select, { components, MultiValueProps } from 'react-select';

export const FeSelect = (props: SelectProps) => {
  const [open, setOpen] = useState(false);
  const {
    label,
    value,
    onChange,
    onClose,
    options,
    onOpen,
    open: openProps,
    loading,
    noOptionsText,
    loadingText,
    multiselect,
    getOptionLabel,
    renderOption,
  } = props;

  const getState = useCallback(
    (option: MultiValueProps<any> | any) => ({
      selected: option.selectProps.isSelected,
      disabled: option.selectProps.isDisabled,
      index:
        option.selectProps.options &&
        option.selectProps.options.findIndex((o: SelectOptionProps<string>) => o.value === option.selectProps.value),
    }),
    [],
  );

  const MultiValueLabel = useCallback(
    (props) => (
      <components.MultiValueLabel {...props}>
        {renderOption && renderOption(props.data, getState(props))}
      </components.MultiValueLabel>
    ),
    [renderOption],
  );

  return (
    <Select
      isMulti={multiselect ?? true}
      placeholder={label}
      value={value}
      components={renderOption ? { MultiValueLabel } : {}}
      options={options}
      isLoading={loading ?? false}
      loadingMessage={() => loadingText ?? 'Loading...'}
      closeMenuOnSelect={false}
      open={openProps ?? open}
      noOptionsMessage={() => noOptionsText ?? 'Empty'}
      onMenuOpen={() => (onOpen ? onOpen : setOpen(true))}
      onMenuClose={() => (onClose ? onClose : setOpen(false))}
      onChange={(newValues, e: any) => onChange(e, newValues)}
      getOptionLabel={(option) => (getOptionLabel ? getOptionLabel(option) : option.label)}
    />
  );
};
