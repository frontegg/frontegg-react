import React, { forwardRef } from 'react';
import { LoaderProps } from './interfaces';
import { ClassNameGenerator } from '../../styles';
import classnames from 'classnames';
import './FeLoader.scss';

const prefixCls = 'fe-loader';
export const FeLoader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const { className, center, children, variant = 'primary', ...restProps } = props;

  const classes = ClassNameGenerator.generate(
    {
      prefixCls,
      className,
    },
    center && 'center'
  );

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
