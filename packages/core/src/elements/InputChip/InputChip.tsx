import React, { FC, ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react';
import { useField, useFormikContext, setIn, getIn } from 'formik';
import { ElementsFactory } from '../../ElementsFactory';
import { InputChipProps } from './interfaces';
import { useDebounce } from '../../hooks';

export const InputChip: FC<InputChipProps> = ({ onChange, validate, value = [], ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSave = useCallback(async () => {
    const inputValue = inputRef.current?.value ?? '';
    if (!inputValue) return;
    if (validate && !(await validate([...value, inputValue]))) {
      return;
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    const ev2 = new Event('input', { bubbles: true });
    inputRef.current?.dispatchEvent(ev2);

    onChange && onChange([...value, inputValue]);
    return;
  }, [inputRef]);

  const onKeyPress = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        await onSave();
      }
      return;
    },
    [onSave]
  );

  const onDelete = useCallback(
    (idx: number) => {
      onChange && onChange([...value.slice(0, idx), ...value.slice(idx + 1)]);
    },
    [onChange, value]
  );

  const onBlur = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.currentTarget.value.trim()) {
        e.currentTarget.value = '';
        return;
      }
      await onSave();
      return;
    },
    [onSave]
  );

  return React.createElement(ElementsFactory.getElement('InputChip'), {
    ...props,
    onBlur,
    onKeyPress,
    onDelete,
    chips: value,
    ref: inputRef,
  });
};

export const FInputChip: FC<InputChipProps & { name: string }> = ({ name, disabled, onChange, ...props }) => {
  const [inputProps, { touched, error }, { setValue, setTouched }] = useField(name);
  const { values, isSubmitting, validateForm } = useFormikContext();

  const debounceError = useDebounce(error, 2000);

  useEffect(() => {
    !!debounceError && validateForm(values);
  }, [validateForm, debounceError, values]);

  const onValidate = useCallback(
    async (value: string[]) => {
      !touched && setTouched(true);
      const errors = await validateForm(setIn(values, name, value));
      return !getIn(errors, name);
    },
    [setTouched, validateForm]
  );

  return (
    <InputChip
      {...inputProps}
      {...props}
      validate={onValidate}
      disabled={isSubmitting || disabled}
      error={touched && error ? error : undefined}
      onChange={onChange ?? ((val) => setValue(val))}
    />
  );
};
