import React, { forwardRef } from 'react';
import { PopupProps } from '@frontegg/react-core';
import { PopupProps as SemanticPopupProps, Popup as SemanticPopup } from 'semantic-ui-react';

const positions: any = {
  t: 'top',
  b: 'bottom',
  l: 'left',
  r: 'right',
  c: 'center',
};

const mapper = ({ action, position: p, ...rest }: PopupProps): SemanticPopupProps => {
  const position: any = p ? `${positions[p?.charAt(0)]} ${positions[p?.charAt(1)]}` : 'bottom center';
  return {
    ...rest,
    on: action,
    position,
  };
};

export const Popup = forwardRef<any, PopupProps>((props, ref) => {
  const semanticProps = mapper(props);
  return <SemanticPopup ref={ref} flowing hoverable {...semanticProps} />;
});
