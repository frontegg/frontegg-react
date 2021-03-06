import { ReactElement, ReactNode } from 'react';

export type PopupPosition = {
  vertical: 'top' | 'bottom' | 'center';
  horizontal: 'left' | 'right' | 'center';
};
export type PopupAction = 'hover' | 'click' | 'focus';

export interface PopupProps {
  className?: string;
  open?: boolean;
  position?: PopupPosition;
  content: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  action: PopupAction;
  trigger: ReactElement;
  mountNode?: HTMLElement;
}
