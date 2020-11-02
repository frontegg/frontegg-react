import React, { FC, useCallback, useState } from 'react';
import { SelectOptionProps, SelectProps, useT } from '@frontegg/react-core';
import { TextField, Chip, CircularProgress, makeStyles } from '@material-ui/core';
import { Autocomplete, AutocompleteProps as MaterialSelectProps } from '@material-ui/lab';
import classNames from 'classnames';

const mapper = ({ multiselect, theme, ...rest }: SelectProps): MaterialSelectProps<true, true, false, true> => {
  const restProps: any = rest;
  const color = theme === 'danger' || theme === 'secondary' ? 'secondary' : 'primary';

  return {
    ...restProps,
    color,
    multiple: !multiselect ? undefined : multiselect,
  };
};
const useStyles = makeStyles({
  inForm: {
    margin: '0.5rem 0 1rem',
  },
});
export const Select: FC<SelectProps> = (props) => {
  const styles = useStyles();
  const { t } = useT();
  const p = mapper(props);
  const [open, setOpen] = useState(false);

  const {
    size,
    value,
    loading,
    onChange,
    options,
    onOpen,
    onClose,
    multiple,
    fullWidth,
    loadingText,
    renderOption,
    noOptionsText,
    getOptionLabel,
    open: propOpen,
  } = p;
  const color: any = p.color;
  const [remountCount, setRemountCount] = useState(0);
  const refresh = () => setRemountCount(remountCount + 1);

  const handleChange = useCallback(
    (e, newValue, reson) => {
      onChange?.(e, newValue, reson);
    },
    [onChange]
  );

  const renderTag = useCallback(
    (option, getTagProps, index) => {
      const state = { ...getTagProps({ index }) };
      return renderOption ? (
        <React.Fragment key={index}>{renderOption(option, state)}</React.Fragment>
      ) : (
        <Chip size={size} disabled={true} label={option.label} {...getTagProps({ index })} />
      );
    },
    [renderOption]
  );

  return (
    <Autocomplete
      className={classNames({ [styles.inForm]: props.inForm })}
      multiple={multiple ?? false}
      options={options}
      size={size}
      value={value}
      loading={loading}
      disableCloseOnSelect
      filterSelectedOptions
      open={propOpen ?? open}
      noOptionsText={noOptionsText ?? t('common.empty-items')}
      loadingText={loadingText ?? `${t('common.loading')}...`}
      onOpen={(e) => (onOpen ? onOpen(e) : setOpen(true))}
      onClose={(e, reson) => (onClose ? onClose(e, reson) : setOpen(false))}
      onChange={(e, newValue, reson) => {
        handleChange(e, newValue, reson);
        setTimeout(() => refresh());
      }}
      getOptionSelected={(option: any, value: any) => option.value === value.value}
      getOptionLabel={(option: any) => (getOptionLabel ? getOptionLabel(option) : option.label)}
      renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => renderTag(option, getTagProps, index))}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          fullWidth={fullWidth ?? true}
          style={{ minWidth: `${fullWidth ? '100%' : '14em'}` }}
          variant='outlined'
          color={color}
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
