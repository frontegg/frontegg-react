import React, { useCallback, useMemo, useState } from 'react';
import { Dropdown, DropdownProps, Flag, Image } from 'semantic-ui-react';
import { SelectProps, SelectOptionProps, useT } from '@frontegg/react-core';

const mapper = ({
  multiselect,
  options,
  getOptionLabel,
  onChange,
  error,
  onBlur,
  ...rest
}: SelectProps): DropdownProps => {
  const semanticOptions = options.map((o: SelectOptionProps<string>) => ({
    value: o.value,
    text: o.label,
    key: o.value,
    content: getOptionLabel ? getOptionLabel(o) : null,
  }));
  const onChangeSemantic: any = onChange;
  return {
    ...rest,
    onChange: onChangeSemantic,
    options: semanticOptions,
    multiple: multiselect,
  };
};

export const Select = (props: SelectProps) => {
  const [open, setOpen] = useState(false);
  const p = mapper(props);
  const { t } = useT();
  const { multiple, options, label, loading, getOptionLabel, renderOption } = p;
  const {
    noOptionsText,
    loadingText,
    onOpen,
    open: openProps,
    onClose,
    fullWidth,
    onBlur,
    value,
    onChange,
    options: propsOptions,
  } = props;

  const handleOnChange = useCallback(
    (e, data) => {
      onChange && onChange(e, data);
    },
    [onChange]
  );

  const optionsMessage = useMemo(
    () => (loading ? loadingText ?? `${t('common.loading')}...` : noOptionsText ?? t('common.empty-items')),
    [loading, loadingText, noOptionsText]
  );

  const renderLabel = useCallback((option, state) => {
    const { flag, image, text } = option;
    const content = renderOption ? (
      <>{renderOption({ label: option.text, value: option.value }, state)}</>
    ) : (
      <>
        {(Flag as any).create(flag)}
        {(Image as any).create(image)}
        {text}
      </>
    );
    return { content };
  }, []);

  const preparedValue = useMemo(() => {
    return value?.map((v) => v.value);
  }, [value]);

  const onHandleChange = useCallback(
    (e, newValue) => {
      const data = propsOptions?.filter((o) => newValue.includes(o.value)) || [];
      onChange?.(e, data);
    },
    [propsOptions]
  );

  return (
    <Dropdown
      {...p}
      search
      selection
      value={preparedValue}
      fluid={fullWidth ?? true}
      open={openProps ?? open}
      onBlur={(e, data) => onBlur?.({ ...e, target: { ...e.target, name: data.name } } as any)}
      options={options}
      loading={loading}
      onOpen={() => (onOpen ? onOpen() : setOpen(true))}
      onClose={() => (onClose ? onClose() : setOpen(false))}
      multiple={multiple ?? false}
      placeholder={value && value.length ? '' : label}
      onChange={(e, data) => onHandleChange(e, data.value)}
      renderLabel={(option, _index, state) => renderLabel(option, state)}
      noResultsMessage={optionsMessage}
      getoptionlabel={getOptionLabel}
    />
  );
};
