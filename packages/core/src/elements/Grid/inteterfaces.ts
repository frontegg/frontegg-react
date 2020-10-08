import { HTMLAttributes } from 'react';

export type GridItemsAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type GridContentAlignment = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type GridJustification =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type GridSize = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the `align-content` style property.
   * It's applied for all screen sizes.
   * @default 'stretch'
   */
  alignContent?: GridContentAlignment;
  /**
   * Defines the `align-items` style property.
   * It's applied for all screen sizes.
   * @default 'stretch'
   */
  alignItems?: GridItemsAlignment;
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container?: boolean;
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'row'
   */
  direction?: GridDirection;
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  item?: boolean;
  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   * @default 'flex-start'
   */
  justifyContent?: GridJustification;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   * @default false
   */
  lg?: boolean | GridSize;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   * @default false
   */
  md?: boolean | GridSize;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   * @default false
   */
  sm?: boolean | GridSize;
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing?: GridSpacing;
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap?: GridWrap;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   * @default false
   */
  xl?: boolean | GridSize;
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs?: boolean | GridSize;
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   * @default false
   */
  zeroMinWidth?: boolean;
}
