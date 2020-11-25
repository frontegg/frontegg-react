import React, { ChangeEventHandler, FC, KeyboardEventHandler, useCallback, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { ElementsFactory } from '../../ElementsFactory';
import { InputChipProps } from './interfaces';

export const InputChip: FC<InputChipProps> = ({ onChange, value = [], ...props }) => {
  const [inputValue, setVal] = useState<string>('');

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
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
  const [inputProps, { touched, error }, { setValue }] = useField(name);
  const { isSubmitting } = useFormikContext();
  return (
    <InputChip
      {...inputProps}
      {...props}
      disabled={isSubmitting || disabled}
      error={touched && error ? error : undefined}
      onChange={(val) => setValue(val)}
    />
  );
};
