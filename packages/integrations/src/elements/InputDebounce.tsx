import { Input, InputProps, useDebounce } from '@frontegg/react-core';
import React, { FC, useEffect, useState } from 'react';

export interface IInputDebounce extends Omit<InputProps, 'onChange' | 'value'> {
  onChange(val: string): void;
  value: string;
}

export const InputDebounce: FC<IInputDebounce> = ({ onChange, value, ...props }) => {
  const [val, setVal] = useState<string>(value || '');
  const changedValue = useDebounce<string>(val, 500);

  useEffect(() => {
    changedValue !== value && onChange(changedValue);
  }, [changedValue]);

  return <Input {...props} onChange={(e) => setVal(e.target.value)} value={val} />;
};
