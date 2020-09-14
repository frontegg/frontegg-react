import React, { FC, ReactNode } from 'react';
import { ElementsFactory } from './ElementsFactory';

export type DialogProps = {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnEscape?: boolean; // default: true
  closeOnDimmerClick?: boolean; // default: true
  header?: ReactNode;
  className?: string;
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';
};

export const Dialog: FC<DialogProps> = (props) => React.createElement(ElementsFactory.getElement('Dialog'), props);
