import React, { FC, useCallback, useMemo, useState } from 'react';
import { Dropdown, DropdownProps, Flag, Image } from 'semantic-ui-react';
import { SelectProps, SelectOptionProps, useT } from '@frontegg/react-core';

const mapper = ({ multiselect, options, getOptionLabel, onChange, ...rest }: SelectProps): DropdownProps => {
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
  const { multiple, options, label, loading, onChange, getOptionLabel, renderOption } = p;
  const { value, noOptionsText, loadingText, onOpen, open: openProps, onClose } = props;
  const handleOnChange = useCallback(
    (e, data) => {
      onChange && onChange(e, data);
    },
    [onChange]
  );

  const optionsMessage = useMemo(() => {
    if (loading) {
      return loadingText ?? `${t('common.loading')}...`;
    } else {
      return noOptionsText ?? t('common.empty-items');
    }
  }, [loading, loadingText, noOptionsText]);

  const renderLabel = useCallback((option, state) => {
    const { flag, image, text } = option;
    return renderOption
      ? {
          content: <>{renderOption({ label: option.text, value: option.value }, state)}</>,
        }
      : {
          content: (
            <>
              {/*@ts-ignore*/}
              {Flag.create(flag)}
              {/*@ts-ignore*/}
              {Image.create(image)}
              {text}
            </>
          ),
        };
  }, []);

  return (
    <Dropdown
      search
      fluid
      selection
      value={value}
      open={openProps ?? open}
      options={options}
      loading={loading}
      onOpen={() => (onOpen ? onOpen() : setOpen(true))}
      onClose={() => (onClose ? onClose() : setOpen(false))}
      multiple={multiple ?? false}
      placeholder={value && value.length ? '' : label}
      onChange={(e, data) => handleOnChange(e, data.value)}
      renderLabel={(option, _index, state) => renderLabel(option, state)}
      noResultsMessage={optionsMessage}
      getoptionlabel={getOptionLabel}
    />
  );
};
