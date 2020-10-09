import React, { FC, useCallback } from 'react';
import { TextField, Chip } from '@material-ui/core';
import { Autocomplete, AutocompleteProps as MaterialSelectProps } from '@material-ui/lab';

const mapper = ({ onChange, value, options, renderInput }: any): MaterialSelectProps<true, true, false, true> => {
  return {
    onChange,
    value,
    options,
    renderInput,
  };
};

export const Select: FC<any> = (props) => {
  const p = mapper(props);
  const { onChange, options, value } = p;

  const handleChange = useCallback((e, newValue, reson) => {
    onChange && onChange(e, newValue, reson);
  }, []);

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={options}
      getOptionLabel={(option: any) => option.label}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option: any, index) => <Chip label={option.label} {...getTagProps({ index })} />);
      }}
      renderInput={(params) => {
        return <TextField {...params} label='Fixed tag' variant='outlined' placeholder='Favorites' />;
      }}
      onChange={(e, newValue, reson) => handleChange(e, newValue, reson)}
    />
  );
};
