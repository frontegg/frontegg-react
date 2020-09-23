import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './FeButton.scss';
import { ButtonProps } from './interfaces';

const prefixCls = 'fe-button';
export const FeButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    children,
    inForm,
    size,
    fullWidth,
    variant,
    isCancel,
    asLink,
    loading,
    ...restProps
  } = props;

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${variant}`]: variant,
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-disabled`]: restProps.disabled,
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-full-width`]: fullWidth,
  });

  return <button ref={ref} className={classes} {...restProps}>
    {children}
  </button>;

});
