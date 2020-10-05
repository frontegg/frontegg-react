import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './FeLoader.scss';
import { LoaderProps } from './interfaces';

const prefixCls = 'fe-loader';
export const FeLoader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const { className, children, variant = 'primary', ...propsWithoutChildren } = props;

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${variant}`]: variant,
  });

  return <div ref={ref} className={classes} {...propsWithoutChildren} />;
});
