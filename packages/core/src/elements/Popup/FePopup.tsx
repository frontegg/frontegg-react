import { PopupProps } from './interfaces';
import React, { forwardRef } from 'react';
import Popup from 'react-popper-tooltip';
import PopupComponent from './PopupComponent';
import './FePopup.scss';

const positions: any = {
  t: 'top',
  b: 'bottom',
  l: 'left',
  r: 'right',
  c: 'center',
  s: 'start',
  e: 'end',
};

const preparePosition = (p: any): any => {
  if (p.charAt(1) === 'c') {
    return `${positions[p.charAt(0)]}`;
  } else if (p.charAt(1) === 'l') {
    return `${positions[p.charAt(0)]}-start`;
  } else if (p.charAt(0) === 'l' || p.charAt(0) === 'r') {
    return `${positions[p.charAt(0)]}`;
  } else {
    return `${positions[p.charAt(0)]}-end`;
  }
};

export const FePopup = forwardRef<Popup, PopupProps>((props, ref) => {
  const { position, trigger, action, content } = props;
  const placement = position ? preparePosition(position) : 'bottom';

  return <PopupComponent ref={ref} trigger={trigger} placement={placement} action={action} content={content} />;
});
