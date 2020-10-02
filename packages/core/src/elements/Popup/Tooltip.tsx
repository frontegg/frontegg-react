import React, { forwardRef, ReactNode } from 'react';
import TooltipTrigger from 'react-popper-tooltip';

export interface ITooltipProps {
  content: ReactNode;
  action: 'hover' | 'click' | 'focus';
  placement: any;
  trigger: ReactNode;
}

const Tooltip = forwardRef<TooltipTrigger, ITooltipProps>((props, ref) => {
  const { trigger, content, action, placement } = props;
  return (
    <TooltipTrigger
      ref={ref}
      trigger={action}
      placement={placement}
      tooltip={({ tooltipRef, getTooltipProps }) => (
        <div
          {...getTooltipProps({
            ref: tooltipRef,
            className: 'fe-tooltip-container',
          })}
        >
          {content}
        </div>
      )}
    >
      {({ getTriggerProps, triggerRef }) => (
        <span
          {...getTriggerProps({
            ref: triggerRef,
            className: 'trigger',
          })}
        >
          {trigger}
        </span>
      )}
    </TooltipTrigger>
  );
});

export default Tooltip;
