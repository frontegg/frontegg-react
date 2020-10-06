import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './FeLoader.scss';
import { LoaderProps } from './interfaces';
import { getThemeClassNameByVariant } from '../../styles';

export const FeLoader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const { className, children, variant = 'primary', ...restProps } = props;

  const classes = classNames('fe-loader', className);
  const innerClasses = classNames('fe-loader__inner', className, getThemeClassNameByVariant(variant));

  return (
    <div ref={ref} className={classes} {...restProps}>
      <span className={innerClasses} />
    </div>
  );
});
