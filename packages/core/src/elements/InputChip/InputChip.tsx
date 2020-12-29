import React, { ChangeEventHandler, FC, KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import { useField, useFormikContext, setIn, getIn } from 'formik';
import { ElementsFactory } from '../../ElementsFactory';
import { InputChipProps } from './interfaces';
import { useDebounce } from '../../hooks';

export const InputChip: FC<InputChipProps> = ({ onChange, validate, value = [], ...props }) => {
  const [inputValue, setVal] = useState<string>('');

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === 'Enter') {
      if (validate && !(await validate([...value, inputValue]))) {
        return;
      }
      onChange && onChange([...value, inputValue]);
      setVal('');
    }
  };

  const onChangeValue: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setVal(e.target.value);
    },
    [setVal]
  );

  const onDelete = useCallback(
    (idx: number) => {
      onChange && onChange([...value.slice(0, idx), ...value.slice(idx + 1)]);
    },
    [onChange, value]
  );

  return React.createElement(ElementsFactory.getElement('InputChip'), {
    ...props,
    onChange: onChangeValue,
    onKeyPress,
    inputValue,
    onDelete,
    chips: value,
  });
};

export const FInputChip: FC<InputChipProps & { name: string }> = ({ name, disabled, ...props }) => {
  const [inputProps, { touched, error }, { setValue, setTouched, setError }] = useField(name);
  const { values, isSubmitting, validateForm } = useFormikContext();

  const debounceError = useDebounce(error, 2000);

  useEffect(() => {
    debounceError && setError('');
  }, [setError, debounceError]);

  return (
    <InputChip
      {...inputProps}
      {...props}
      validate={async (value) => {
        !touched && setTouched(true);
        const errors = await validateForm(setIn(values, name, value));
        return !getIn(errors, name);
      }}
      disabled={isSubmitting || disabled}
      error={touched && error ? error : undefined}
      onChange={(val) => setValue(val)}
    />
  );
};
