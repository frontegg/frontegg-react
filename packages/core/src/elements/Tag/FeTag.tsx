import React, { forwardRef } from 'react';
import { TagProps } from './interfaces';
import './FeTag.scss';
import { FeIcon } from '../Icon/FeIcon';
import { ClassNameGenerator } from '../../styles';

const prefixCls = 'fe-tag';
export const FeTag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const { className, children, size, variant = 'default', onDelete, ...rest } = props;

  const classes = ClassNameGenerator.generate({
    prefixCls,
    className,
    size,
    theme: props.disabled ? 'disabled' : variant,
    isClickable: !!props.onClick,
  });

  const deleteIconClasses = ClassNameGenerator.generate({
    prefixCls: `${prefixCls}__icon`,
    isClickable: true,
  });

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
      {onDelete && <FeIcon className={deleteIconClasses} name='delete' onClick={onDelete} />}
    </div>
  );
});
