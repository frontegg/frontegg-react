import { IInputChip } from '@frontegg/react-core';
import classNames from 'classnames';
import React, { FC, useRef } from 'react';
import { Label, Icon } from 'semantic-ui-react';
import './styles.scss';

export const InputChip: FC<IInputChip> = ({ chips, fullWidth, inputValue, onDelete, ...inputProps }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={classNames('input-chip', { fluid: fullWidth })}
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      {chips.map((chip, idx) => (
        <Label as='div' key={idx} className='chip'>
          {chip}
          {!!onDelete && <Icon name='delete' onClick={() => onDelete(idx)} />}
        </Label>
      ))}
      <input {...inputProps} value={inputValue} />
    </div>
  );
};
