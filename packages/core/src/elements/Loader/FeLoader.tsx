import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './FeLoader.scss';
import { LoaderProps } from './interfaces';
import { getThemeClassNameByVariant } from '../../styles';

export const FeLoader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const { className, children, variant = 'primary', ...propsWithoutChildren } = props;

  const classes = classNames('fe-loader', className);
  const innerClasses = classNames('fe-inner-loader', className, getThemeClassNameByVariant(variant));

  return (
    <div ref={ref} className={classes} {...propsWithoutChildren}>
      <span className={innerClasses} />
    </div>
  );
});
