import React, { forwardRef, ForwardRefRenderFunction, RefForwardingComponent } from 'react';
import classNames from 'classnames';
import { GridProps } from './inteterfaces';


export const FeGrid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const {
    alignContent = 'stretch',
    alignItems = 'stretch',
    className: classNameProp,
    container = false,
    direction = 'row',
    item = false,
    justifyContent = 'flex-start',
    lg = false,
    md = false,
    sm = false,
    spacing = 0,
    wrap = 'wrap',
    xl = false,
    xs = false,
    zeroMinWidth = false,
    ...other
  } = props;


  return <div className={classNames('fe-grid', {
    [`fe-container`]: container,
    [`fe-item`]: item,
    [`fe-zeroMinWidth`]: zeroMinWidth,
    [`fe-spacing-xs-${String(spacing)}`]: container && spacing !== 0,
    [`fe-direction-xs-${String(direction)}`]: direction !== 'row',
    [`fe-wrap-xs-${String(wrap)}`]: wrap !== 'wrap',
    [`fe-align-items-xs-${String(alignItems)}`]: alignItems !== 'stretch',
    [`fe-align-content-xs-${String(alignContent)}`]: alignContent !== 'stretch',
    [`fe-justify-content-xs-${String(justifyContent)}`]: justifyContent !== 'flex-start',
    [`fe-grid-xs-${String(xs)}`]: xs,
    [`fe-grid-sm-${String(sm)}`]: sm,
    [`fe-grid-md-${String(md)}`]: md,
    [`fe-grid-lg-${String(lg)}`]: lg,
    [`fe-grid-xl-${String(xl)}`]: xl,
  }, classNameProp)} ref={ref} {...other} />;
});
