import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './FeLoader.scss';
import { LoaderProps } from '../../ElementsFactory';

const prefixCls = 'fe-loader';
export const FeLoader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const { className, children, color = 'primary', ...propsWithoutChildren } = props;

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${color}`]: color,
  });

  return <div ref={ref} className={classes} {...propsWithoutChildren} />;
});
