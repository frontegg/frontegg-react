import { ReactNode } from 'react';

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
