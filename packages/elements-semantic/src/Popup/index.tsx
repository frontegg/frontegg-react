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

const mapper = ({
  action,
  position: { vertical, horizontal } = {
    vertical: 'bottom',
    horizontal: 'center',
  },
  ...rest
}: PopupProps): SemanticPopupProps => {
  let position: any;

  if (vertical === 'center') {
    position = `${horizontal === 'center' ? 'bottom' : horizontal} center`;
  } else if (horizontal === 'center') {
    position = `${vertical} center`;
  } else {
    position = `${vertical}  ${horizontal}`;
  }

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
