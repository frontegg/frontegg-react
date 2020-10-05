import React, { forwardRef } from 'react';
import { TagProps } from './interfaces';
import classNames from 'classnames';
import './FeTag.scss';
import { FeIcon } from '../Icon/FeIcon';
import { clickableClassName, getThemeClassNameByVariant, Theme } from '../../styles';

const prefixCls = 'fe-tag';
export const FeTag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const { className, children, variant = 'default', onDelete, ...rest } = props;

  const classes = classNames(
    prefixCls,
    className,
    getThemeClassNameByVariant(props.disabled ? 'disabled' : variant), {
    [clickableClassName]: props.onClick,
  });

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
      {onDelete && <FeIcon className={clickableClassName} name='delete' onClick={onDelete} />}
    </div>
  );
});
