import React, { useRef } from 'react';
import { SwitchToggleProps } from './interfaces';
import classNames from 'classnames';

import './FeSwitchToggle.scss';
export const FeSwitchToggle = (props: SwitchToggleProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { loading, disabled, value, labels, readOnly, name } = props;
  const onChange = disabled || readOnly ? undefined : props.onChange;

  const toggle = (
    <label className='fe-switch'>
      <input ref={ref} checked={value} onChange={(e) => onChange?.(e.target.checked)} name={name} type='checkbox' />
      <span className='fe-slider'></span>
    </label>
  );

  if (labels) {
    return (
      <div
        className={classNames('fe-switch-toggle__with_labels', {
          'fe-switch-toggle__active-left': !value,
          'fe-switch-toggle__active-right': value,
          'fe-switch-toggle__disabled': disabled || loading,
          'fe-switch-toggle__loading': loading,
        })}
      >
        <span
          className='fe-switch-toggle__label'
          onClick={() => {
            props.value && ref?.current?.click();
          }}
        >
          {labels[0]}
        </span>
        {toggle}
        <span
          className='fe-switch-toggle__label'
          onClick={() => {
            !props.value && ref?.current?.click();
          }}
        >
          {labels[1]}
        </span>
      </div>
    );
  }
  return toggle;
};
