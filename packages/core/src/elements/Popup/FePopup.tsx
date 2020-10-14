import { PopupPosition, PopupProps } from './interfaces';
import React, { forwardRef, useMemo, cloneElement, MouseEvent } from 'react';
import Popup from 'react-popper-tooltip';
import './FePopup.scss';

const preparePosition = (p?: PopupPosition): any => {
  if (!p) {
    return 'bottom';
  }

  if (p.vertical === 'center') {
    return p.horizontal === 'center' ? 'auto' : p.horizontal;
  }

  if (p.horizontal === 'center') {
    return p.vertical;
  }

  return `${p.vertical}-${p.horizontal === 'left' ? 'start' : 'end'}`;
};

export const FePopup = forwardRef<Popup, PopupProps>((props, ref) => {
  const { position, trigger, action, content, mountNode } = props;
  const placement = useMemo(() => preparePosition(position), [position]);

  return (
    <Popup
      ref={ref}
      trigger={action}
      placement={placement}
      portalContainer={mountNode}
      tooltip={({ tooltipRef: ref, getTooltipProps }) => {
        return (
          <div
            {...getTooltipProps({
              ref,
              className: 'fe-popup__container',
              onClick: (e: MouseEvent) => e.stopPropagation(),
            })}
          >
            {content}
          </div>
        );
      }}
    >
      {({ getTriggerProps, triggerRef: ref }) => {
        return React.cloneElement(trigger, {
          ...getTriggerProps({
            ref,
            onClick: (e: MouseEvent) => e.stopPropagation(),
          }),
        });
      }}
    </Popup>
  );
});
