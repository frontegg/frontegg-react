import React, { FC, useRef } from 'react';
import { Checkbox, CheckboxProps, Ref } from 'semantic-ui-react';
import { SwitchToggleProps } from '@frontegg/react-core';
import classNames from 'classnames';

const mapper = (props: SwitchToggleProps): CheckboxProps => ({
  toggle: true,
  checked: props.value,
  onChange: (e, data) => props.onChange?.(!!data.checked),
});

export const SwitchToggle: FC<SwitchToggleProps> = (props) => {
  const ref = useRef<HTMLInputElement>(null);
  const { labels } = props;
  const { className, ...checkboxProps } = mapper(props);

  const toggle = <Ref innerRef={ref}>
    <Checkbox className={classNames('fe-switch-toggle', className)} {...checkboxProps}/>
  </Ref>;

  if (labels) {
    return <div className={classNames('fe-switch-toggle__with_labels', {
      'fe-switch-toggle__disabled': !props.value,
      'fe-switch-toggle__enabled': props.value,
    })}>
      <span className='fe-switch-toggle__label' onClick={() => {
        props.value && ref?.current?.querySelector('input')?.click();
      }}>{labels[0]}</span>
      {toggle}
      <span className='fe-switch-toggle__label' onClick={() => {
        !props.value && ref?.current?.querySelector('input')?.click();
      }}>{labels[1]}</span>
    </div>;
  }
  return toggle;
};
