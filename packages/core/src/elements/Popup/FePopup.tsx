import { PopupPosition, PopupProps } from './interfaces';
import React, { forwardRef, useMemo, cloneElement, MouseEvent } from 'react';
import Popup from 'react-popper-tooltip';
import './FePopup.scss';

const positions: { [key: string]: string } = {
  t: 'top',
  b: 'bottom',
  l: 'left',
  r: 'right',
  c: 'center',
  s: 'start',
  e: 'end',
};

const preparePosition = (p?: PopupPosition): any => {
  if (!p) {
    return 'bottom';
  }

  const center = p.indexOf('c') !== 1;
  const left = p.indexOf('l') !== 1;
  const right = p.indexOf('r') !== 1;
  const top = p.indexOf('t') !== 1;
  const bottom = p.indexOf('b') !== 1;
  const position = positions[p.charAt(0)];

  if (center) {
    return position;
  }
  if (top || bottom) {
    return `${position}${left ? '-start' : right ? '-end' : ''}`;
  }
  return position;
};

export const FePopup = forwardRef<Popup, PopupProps>((props, ref) => {
  const { position, trigger, action, content } = props;
  const placement = useMemo(() => preparePosition(position), [position]);

  return (
    <Popup
      ref={ref}
      trigger={action}
      placement={placement}
      tooltip={({ tooltipRef, getTooltipProps }) => {
        return (
          <div
            {...getTooltipProps({
              ref: tooltipRef,
              className: 'fe-popup-container',
              onClick: (e: MouseEvent) => e.stopPropagation(),
            })}
          >
            {content}
          </div>
        );
      }}
    >
      {({ getTriggerProps, triggerRef }) => {
        return (
          <span
            {...getTriggerProps({
              ref: triggerRef,
              onClick: (e: MouseEvent) => e.stopPropagation(),
            })}
          >
            {trigger}
          </span>
        );
      }}
    </Popup>
  );
});
