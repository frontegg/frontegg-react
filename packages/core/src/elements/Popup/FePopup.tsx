import { PopupPosition, PopupProps } from './interfaces';
import React, { forwardRef, useMemo, MouseEvent, useEffect, useRef, useImperativeHandle } from 'react';
import Popup from 'react-popper-tooltip';
import './FePopup.scss';
import classNames from 'classnames';

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
  const { position, trigger, action, content, className, mountNode, open } = props;
  const placement = useMemo(() => preparePosition(position), [position]);
  const popupRef = useRef<Popup | null>(null);

  useImperativeHandle<any, any>(
    ref,
    () => ({
      ...popupRef.current,
      closePopup: () => popupRef.current?.setState({ tooltipShown: false }),
    }),
    [popupRef]
  );

  useEffect(() => {
    if (open != null) {
      popupRef.current?.setState({ tooltipShown: open });
    }
  }, [open]);

  return (
    <Popup
      data-test-id='popup-btn'
      ref={(node) => {
        popupRef.current = node;
        if (ref && typeof ref === 'function') {
          ref?.(node);
        } else if (ref && typeof ref === 'object') {
          ref.current = node;
        }
      }}
      trigger={action}
      closeOnReferenceHidden={true}
      placement={placement}
      onVisibilityChange={(visible) => (visible ? props.onOpen?.() : props.onClose?.())}
      portalContainer={mountNode}
      tooltip={({ tooltipRef, getTooltipProps }) => {
        return (
          <div
            {...getTooltipProps({
              ref: tooltipRef,
              className: classNames('fe-popup__container', className),
              onClick: (e: MouseEvent) => e.stopPropagation(),
            })}
          >
            {typeof content === 'function' ? content() : content}
          </div>
        );
      }}
    >
      {({ getTriggerProps, triggerRef: ref }) => {
        return (
          <span
            ref={ref}
            {...getTriggerProps({
              ref,
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
