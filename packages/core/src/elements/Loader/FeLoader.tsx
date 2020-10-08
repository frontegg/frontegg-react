import React, { forwardRef } from 'react';
import { LoaderProps } from './interfaces';
import { ClassNameGenerator } from '../../styles';
import './FeLoader.scss';

const prefixCls = 'fe-loader';
export const FeLoader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const { className, children, variant = 'primary', ...restProps } = props;

  const classes = ClassNameGenerator.generate({ prefixCls, className });

  const innerClasses = ClassNameGenerator.generate({
    prefixCls: `${prefixCls}__inner`,
    className,
    theme: variant,
  });

  return (
    <div ref={ref} className={classes} {...restProps}>
      <span className={innerClasses} />
    </div>
  );
});
