import React, { forwardRef } from 'react';
import { ButtonProps } from './interfaces';
import { FeLoader } from '../Loader/FeLoader';
import { ClassNameGenerator } from '../../styles';
import classNames from 'classnames';
import './FeButton.scss';

const prefixCls = 'fe-button';
export const FeButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    children,
    variant,
    size,
    loading,
    iconButton,
    fullWidth,
    isCancel,
    inForm,
    asLink,
    type = 'button',
    ...restProps
  } = props;

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
    <button ref={ref} className={classNames(classes, { ['fe-icon-button']: iconButton })} type={type} {...restProps}>
      {children}
      {loading && <FeLoader size={size === 'small' ? 18 : 24} />}
    </button>
  );
});
