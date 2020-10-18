import React, { forwardRef } from 'react';
import { ButtonProps } from './interfaces';
import { FeLoader } from '../Loader/FeLoader';
import { ClassNameGenerator } from '../../styles';
import './FeButton.scss';

const prefixCls = 'fe-button';
export const FeButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children, variant, size, loading, fullWidth, ...restProps } = props;
  const { isCancel, inForm, asLink, ...propsWithoutJunk } = restProps;

  const disabled = props.disabled || loading;

  const classes = ClassNameGenerator.generate({
    className,
    prefixCls,
    size,
    theme: disabled ? 'disabled' : variant,
    isClickable: true,
    isFullWidth: fullWidth,
    isLoading: loading,
  });

  return (
    <button ref={ref} className={classes} {...propsWithoutJunk}>
      {children}
      {loading && <FeLoader />}
    </button>
  );
});
