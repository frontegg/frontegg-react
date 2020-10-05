import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './FeButton.scss';
import { ButtonProps } from './interfaces';
import { FeLoader } from '../Loader/FeLoader';
import { clickableClassName, getThemeClassNameByVariant } from '../../styles';

const prefixCls = 'fe-button';
export const FeButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children, variant = 'default', size, loading, fullWidth, ...restProps } = props;
  const { isCancel, inForm, asLink, ...propsWithoutJunk } = restProps;

  const disabled = props.disabled || loading;

  const classes = classNames(
    prefixCls,
    className,
    clickableClassName,
    getThemeClassNameByVariant(disabled ? 'disabled' : variant),
    {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-full-width`]: fullWidth,
      [`${prefixCls}-loader`]: loading,
    }
  );

  return (
    <button ref={ref} className={classes} {...propsWithoutJunk}>
      {children}
      {loading && <FeLoader />}
    </button>
  );
});
