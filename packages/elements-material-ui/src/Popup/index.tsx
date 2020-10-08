import React, { forwardRef, useMemo } from 'react';
import { PopoverProps } from '@material-ui/core';
import { PopupClick } from './PopupClick';
import { PopupHover } from './PopupHover';
import { PopupFocus } from './PopupFocus';
import { PopupProps } from '@frontegg/react-core';

const positions: any = {
  t: 'top',
  b: 'bottom',
  l: 'left',
  r: 'right',
  c: 'center',
};

//it's for transformOrigin property
const invertedPositions: any = {
  t: 'bottom',
  b: 'top',
  l: 'right',
  r: 'left',
  c: 'center',
};

const mapper = (props: PopupProps): Omit<PopoverProps, 'open'> => {
  const { position: p } = props;
  let aVertical: any = '';
  let aHorizontal: any = '';
  let tVertical: any = '';
  let tHorizontal: any = '';
  if (p?.charAt(0) === 'l' || p?.charAt(0) === 'r') {
    aHorizontal = positions[p?.charAt(0)];
    aVertical = 'center';
    tHorizontal = invertedPositions[p?.charAt(0)];
    tVertical = 'center';
  } else {
    aVertical = positions[p?.charAt(0) || 'b'];
    aHorizontal = positions[p?.charAt(1) || 'c'];
    tVertical = invertedPositions[p?.charAt(0) || 'b'];
    tHorizontal = invertedPositions[p?.charAt(1) || 'c'];
  }
  return {
    anchorOrigin: {
      vertical: aVertical,
      horizontal: aHorizontal,
    },
    transformOrigin: {
      vertical: tVertical,
      horizontal: tHorizontal,
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
