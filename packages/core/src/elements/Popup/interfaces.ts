import { ReactNode, HTMLAttributes, ReactElement } from 'react';

export type PopupPosition = 'tr' | 'tl' | 'tc' | 'br' | 'bl' | 'bc' | 'lc' | 'rc';
export type PopupAction = 'hover' | 'click' | 'focus';

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  position?: PopupPosition;
  content: JSX.Element | ReactNode;
  action: PopupAction;
  trigger: JSX.Element | ReactNode | Element;
  mountNode?: HTMLElement;
}
