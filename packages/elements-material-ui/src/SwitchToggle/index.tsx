import React, { FC, useRef } from 'react';
import { SwitchToggleProps } from '@frontegg/react-core';
import './style.scss';
import { Switch as MaterialSwitch, SwitchProps as MaterialSwitchProps } from '@material-ui/core';
import classNames from 'classnames';

const mapper = (props: SwitchToggleProps): MaterialSwitchProps => ({
  disabled: props.disabled || props.loading,
  checked: props.value,
  onChange: (e, value) => props.onChange?.(value),
});

export const SwitchToggle: FC<SwitchToggleProps> = (props) => {
  const ref = useRef<HTMLInputElement>(null);
  const { labels } = props;
  const { className, ...toggleProps } = mapper(props);

  const toggle = <MaterialSwitch color='primary' inputRef={ref} {...toggleProps} />;

  if (labels) {
    return (
      <div
        className={classNames('fe-switch-toggle__with_labels', {
          'fe-switch-toggle__active-left': !props.value,
          'fe-switch-toggle__active-right': props.value,
          'fe-switch-toggle__disabled': props.disabled || props.loading,
          'fe-switch-toggle__loading': props.loading,
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
