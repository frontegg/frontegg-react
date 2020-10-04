import { ReactNode, HTMLAttributes } from 'react';

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  position?: 'tr' | 'tl' | 'tc' | 'br' | 'bl' | 'bc' | 'lc' | 'rc';
  content: JSX.Element | ReactNode;
  action: 'hover' | 'click' | 'focus';
  trigger: JSX.Element | ReactNode | Element;
  mountNode?: HTMLElement;
}
