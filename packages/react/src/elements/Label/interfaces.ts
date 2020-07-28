import React, { CSSProperties, ReactNode } from 'react';

export type LabelColors =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'olive'
  | 'green'
  | 'teal'
  | 'blue'
  | 'violet'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'grey'
  | 'black'

export interface ILabel {
  /** An element type to render */
  as?: 'div' | 'span' | 'a';
  className?: string;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  color?: LabelColors;
  children: ReactNode;
}
