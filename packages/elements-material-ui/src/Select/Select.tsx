import React, { FC, useCallback, useState } from 'react';
// import { SelectProps } from '@frontegg/react-core';
import { TextField, Chip, CircularProgress } from '@material-ui/core';
import { Autocomplete, AutocompleteProps as MaterialSelectProps } from '@material-ui/lab';

const mapper = ({ multiselect, ...rest }: any): MaterialSelectProps<true, true, false, true> => {
  return {
    ...rest,
    multiple: multiselect,
  };
};

export const Select: FC<any> = (props) => {
  const p = mapper(props);
  const [open, setOpen] = useState(false);

  const {
    size,
    loading,
    onChange,
    options,
    onOpen,
    onClose,
    multiple,
    loadingText,
    renderOption,
    noOptionsText,
    getOptionLabel,
    open: propOpen,
  } = p;

  const handleChange = useCallback((e, newValue, reson) => {
    onChange && onChange(e, newValue, reson);
  }, []);

  const renderTag = useCallback(
    (option, getTagProps, index) => {
      const state = { ...getTagProps({ index }) };
      return renderOption ? (
        <React.Fragment key={index}>{renderOption(option, state)}</React.Fragment>
      ) : (
        <Chip disabled={true} label={option.label} {...getTagProps({ index })} />
      );
    },
    [renderOption]
  );

  return (
    <Autocomplete
      multiple={multiple ?? true}
      options={options}
      size={size ?? 'small'}
      loading={loading ?? false}
      disableCloseOnSelect
      open={propOpen ?? open}
      noOptionsText={noOptionsText ?? 'Empty'}
      loadingText={loadingText ?? 'Loading...'}
      onOpen={(e) => (onOpen ? onOpen(e) : setOpen(true))}
      onClose={(e, reson) => (onClose ? onClose(e, reson) : setOpen(false))}
      onChange={(e, newValue, reson) => handleChange(e, newValue, reson)}
      getOptionLabel={(option: any) => (getOptionLabel ? getOptionLabel(option) : option.label)}
      renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => renderTag(option, getTagProps, index))}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant='standard'
          color={props.theme}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
