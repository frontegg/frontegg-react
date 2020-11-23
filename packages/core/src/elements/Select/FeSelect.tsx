import React, { useCallback, useState } from 'react';
import { SelectProps, SelectOptionProps } from './interfaces';
import Select, { components, MultiValueProps } from 'react-select';
import { useT } from '../../hooks';
import { ClassNameGenerator } from '../../styles';
import classNames from 'classnames';

export const FeSelect = (props: SelectProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useT();
  const {
    label,
    value,
    onChange,
    onClose,
    options,
    onOpen,
    name,
    open: openProps,
    loading,
    noOptionsText,
    loadingText,
    multiselect,
    getOptionLabel,
    renderOption,
    fullWidth,
    onBlur,
  } = props;

  const getState = useCallback(
    (option: MultiValueProps<any> | any) => ({
      selected: option.selectProps.isSelected,
      disabled: option.selectProps.isDisabled,
      index: option.selectProps.options?.findIndex(
        (o: SelectOptionProps<string>) => o.value === option.selectProps.value
      ),
    }),
    []
  );

  const MultiValueLabel = useCallback(
    (props) => (
      <components.MultiValueLabel {...props}>{renderOption?.(props.data, getState(props))}</components.MultiValueLabel>
    ),
    [renderOption]
  );

  const customStyles = {
    container: (provided: any, { selectProps: { width } }: any) => ({
      ...provided,
      minWidth: '14em',
      width: typeof fullWidth === 'boolean' ? width : '100%',
      maxWidth: '100%',
    }),
    menuPortal: (provided: any) => {
      const { zIndex, ...rest } = provided;
      return { ...rest, zIndex: 1051 };
    },
  };

  const className = classNames(
    ClassNameGenerator.generate({
      prefixCls: 'fe-select',
      className: props.className,
      isFullWidth: props.fullWidth,
    }),
    {
      'fe-input__in-form ': props.inForm,
    }
  );

  return (
    <Select
      isDisabled={props.disabled}
      classNamePrefix={'fe-select'}
      name={name}
      className={className}
      styles={customStyles}
      isMulti={multiselect ?? false}
      placeholder={label}
      value={value}
      width={fullWidth ? '100%' : 'max-content'}
      components={renderOption ? { MultiValueLabel } : {}}
      options={options}
      menuPortalTarget={document.body}
      isLoading={loading ?? false}
      {...(multiselect && { closeMenuOnSelect: false })}
      onBlur={(e) => {
        onBlur && onBlur({ ...e, target: { ...e.target, name } });
      }}
      menuIsOpen={openProps ?? open}
      loadingMessage={() => loadingText ?? `${t('common.loading')}...`}
      noOptionsMessage={() => noOptionsText ?? t('common.empty-items')}
      onMenuOpen={() => (onOpen ? onOpen : setOpen(true))}
      onMenuClose={() => (onClose ? onClose : setOpen(false))}
      onChange={(newValues, e: any) => onChange?.(e, newValues ?? [])}
      getOptionLabel={(option) => (getOptionLabel ? getOptionLabel(option) : option.label)}
    />
  );
};
