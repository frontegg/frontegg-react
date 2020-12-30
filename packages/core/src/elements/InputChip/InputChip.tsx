import React, { ChangeEventHandler, FC, KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import { useField, useFormikContext, setIn, getIn } from 'formik';
import { ElementsFactory } from '../../ElementsFactory';
import { InputChipProps } from './interfaces';
import { useDebounce } from '../../hooks';

export const InputChip: FC<InputChipProps> = ({ onChange, validate, value = [], ...props }) => {
  const [inputValue, setVal] = useState<string>('');

  const onSave = async () => {
    if (validate && !(await validate([...value, inputValue]))) {
      return;
    }
    onChange && onChange([...value, inputValue]);
    setVal('');
  };

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === 'Enter') {
      onSave();
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

  const onBlur = async () => {
    if (!inputValue.trim()) {
      setVal('');
      return;
    }
    onSave();
  };

  return React.createElement(ElementsFactory.getElement('InputChip'), {
    ...props,
    onChange: onChangeValue,
    onBlur,
    onKeyPress,
    inputValue,
    onDelete,
    chips: value,
  });
};

export const FInputChip: FC<InputChipProps & { name: string }> = ({ name, disabled, ...props }) => {
  const [inputProps, { touched, error }, { setValue, setTouched }] = useField(name);
  const { values, isSubmitting, validateForm } = useFormikContext();

  const debounceError = useDebounce(error, 2000);

  useEffect(() => {
    !!debounceError && validateForm(values);
  }, [validateForm, debounceError, values]);

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
