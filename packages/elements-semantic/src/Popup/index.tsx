import React, { FC } from 'react';
import { PopupProps } from '@frontegg/react-core';
import { PopupProps as SemanticPopupProps, Popup as SemanticPopup } from 'semantic-ui-react';

const mapper = ({ action, position, ...rest }: PopupProps): SemanticPopupProps => ({
  ...rest,
  on: action,
});

export const Popup: FC<PopupProps> = (props) => {
  const semanticProps = mapper(props);

  console.log(props);
  console.log(semanticProps);

  return <SemanticPopup {...semanticProps} />;
};
