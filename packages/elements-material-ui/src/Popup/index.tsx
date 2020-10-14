import React, { forwardRef, useMemo } from 'react';
import { PopupProps } from '@frontegg/react-core';
import { PopoverProps } from '@material-ui/core';
import { PopupClick } from './PopupClick';
import { PopupHover } from './PopupHover';
import { PopupFocus } from './PopupFocus';

const invertedVerticalPositions: { [key in string]: 'top' | 'bottom' | 'center' } = {
  top: 'bottom',
  bottom: 'top',
  center: 'center',
};
const invertedHorizontalPositions: { [key in string]: 'left' | 'right' | 'center' } = {
  left: 'right',
  right: 'left',
  center: 'center',
};

const mapper = (props: PopupProps): Omit<PopoverProps, 'open'> => {
  const { position: { vertical, horizontal } = { vertical: 'bottom', horizontal: 'center' } } = props;
  return {
    anchorOrigin: {
      vertical,
      horizontal,
    },
    transformOrigin: {
      vertical: invertedVerticalPositions[vertical],
      horizontal: invertedHorizontalPositions[horizontal],
    },
  };
};

export const Popup = forwardRef<HTMLElement, PopupProps>((props, ref) => {
  const { action, content, trigger } = props;
  const popupProps: any = mapper(props);

  const Component = useMemo(() => {
    switch (action) {
      case 'click':
        return PopupClick;
      case 'hover':
        return PopupHover;
      case 'focus':
        return PopupFocus;
      default:
        return PopupClick;
    }
  }, [action]);

  return <Component ref={ref} {...popupProps} content={content} trigger={trigger} />;
});
