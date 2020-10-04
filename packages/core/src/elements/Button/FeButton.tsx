import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './FeButton.scss';
import { ButtonProps } from './interfaces';
import { FeLoader } from '../Loader';

const prefixCls = 'fe-button';
export const FeButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    children,
    variant,
    size,
    disabled: disabledStateFromProps,
    loading,
    fullWidth,
    ...restProps
  } = props;
  const { isCancel, inForm, asLink, ...propsWithoutJunk } = restProps;

  const isButtonDisabled = disabledStateFromProps || loading;

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${variant}`]: variant,
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-disabled`]: isButtonDisabled,
    [`${prefixCls}-full-width`]: fullWidth,
    [`${prefixCls}-loader`]: loading,
  });

  return (
    <button ref={ref} tabIndex={isButtonDisabled ? -1 : 0} className={classes} {...propsWithoutJunk}>
      {children}
      {loading && <FeLoader />}
    </button>
  );
});
