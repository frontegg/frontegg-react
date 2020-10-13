import React, { forwardRef, useCallback, useState } from 'react';
import { CheckboxProps } from './interfaces';
import classNames from 'classnames';
import './FeCheckbox.scss';
import { FeIcon } from '../Icon/FeIcon';

const prefixCls = 'fe-checkbox';
export const FeCheckbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { className, label, disabled, fullWidth, indeterminate, inForm } = props;
  const [_checked, _setChecked] = useState(props.defaultChecked);

  const checked = props.hasOwnProperty('checked') ? props.checked : _checked;

  const toggleCheck = useCallback(
    (e) => {
      props.onChange?.(e);
      _setChecked(e.target.checked);
    },
    [checked, indeterminate]
  );

  return (
    <div
      className={classNames(prefixCls, className, {
        [`${prefixCls}__in-form`]: inForm,
        [`${prefixCls}__checked`]: checked,
        [`${prefixCls}__disabled`]: disabled,
        [`${prefixCls}__full-width`]: fullWidth,
        [`${prefixCls}__with-label`]: !!label,
      })}
    >
      <div className={`${prefixCls}__content`}>
        <input type='checkbox' ref={ref} checked={indeterminate || checked} onChange={toggleCheck} />
        <span className={`${prefixCls}__input`}>
          <FeIcon name={indeterminate ? 'indeterminate' : 'checkmark'} />
        </span>
        {label && <label className={`${prefixCls}__label`}>{label}</label>}
      </div>
    </div>
  );
});
