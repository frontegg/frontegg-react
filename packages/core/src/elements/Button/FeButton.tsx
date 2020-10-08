import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './FeButton.scss';
import { ButtonProps } from './interfaces';

const prefixCls = 'fe-button';
export const FeButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children, variant, size, disabled, loading, fullWidth, ...restProps } = props;
  const { isCancel, inForm, asLink, ...propsWithoutJunk } = restProps;

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${variant}`]: variant,
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-disabled`]: disabled || loading,
    [`${prefixCls}-full-width`]: fullWidth,
  });

  return (
    <button ref={ref} tabIndex={disabled ? -1 : 0} className={classes} {...propsWithoutJunk}>
      {children}
      {loading && <div className={`${prefixCls}-loader`} />} {/* TODO: Find a loader */}
    </button>
  );
});
