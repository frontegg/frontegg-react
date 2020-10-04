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
        'fe-checkbox__in-form': inForm,
        'fe-checkbox__checked': checked,
        'fe-checkbox__disabled': disabled,
        'fe-checkbox__full-width': fullWidth,
        'fe-checkbox__with-label': !!label,
      })}
    >
      <div className='fe-checkbox__content'>
        <input type='checkbox' ref={ref} checked={indeterminate || checked} onChange={toggleCheck} />
        <span className='fe-checkbox__input'>
          <FeIcon name={indeterminate ? 'indeterminate' : 'checkmark'} />
        </span>
        {label && <label className='fe-checkbox__label'>{label}</label>}
      </div>
    </div>
  );
});
