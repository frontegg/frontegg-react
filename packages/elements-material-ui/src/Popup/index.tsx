import React, { forwardRef, ReactElement, ReactNode } from 'react';
import MaterialPopup from 'react-popper-tooltip';
import { PopupProps } from '@frontegg/react-core';
import './style.scss';

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

export interface ITooltipProps {
  content: ReactNode;
  action: 'hover' | 'click' | 'focus';
  placement: any;
  trigger: ReactNode;
}

const mapper = ({ position: p, ...rest }: PopupProps): ITooltipProps => {
  return {
    ...rest,
    placement: p ? preparePosition(p) : 'bottom',
  };
};

export const Popup = forwardRef<MaterialPopup, PopupProps>((props, ref) => {
  const mPopupProps = mapper(props);
  const { action, placement, trigger, content } = mPopupProps;
  return (
    <MaterialPopup
      ref={ref}
      trigger={action}
      placement={placement}
      tooltip={({ tooltipRef, getTooltipProps }) => (
        <div
          {...getTooltipProps({
            ref: tooltipRef,
            className: 'material-popup-container',
          })}
        >
          {content}
        </div>
      )}
    >
      {({ getTriggerProps, triggerRef }) =>
        React.cloneElement(trigger as React.ReactElement<any>, {
          ...getTriggerProps({
            ref: triggerRef,
            className: 'trigger',
          }),
        })
      }
    </MaterialPopup>
  );
});
