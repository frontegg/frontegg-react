import React, { FC } from 'react';
import classNames from 'classnames';

export const SortArrows: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const {
    xmlns = 'http://www.w3.org/2000/svg',
    viewBox = '0 0 12 12',
    className,
    width = '2rem',
    height = '2rem',
    ...svgProps
  } = props;
  const children = props.children ?? (
    <>
      <path fill='currentColor' d='M 2.497 3.989 L 9.497 3.989 L 5.997 -0.011 L 2.497 3.989 Z' />
      <path fill='currentColor' d='M 5.997 11.989 L 9.497 7.989 L 2.497 7.989 L 5.997 11.989 Z' />
    </>
  );
  return (
    <svg
      {...svgProps}
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns={xmlns}
      className={classNames('fe-icon', className)}
    >
      {children}
    </svg>
  );
};

export const SortArrowsAsc: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <SortArrows {...props}>
      <path fill='var(--color-primary-dark)' d='M 2.497 3.989 L 9.497 3.989 L 5.997 -0.011 L 2.497 3.989 Z' />
      <path fill='currentColor' d='M 5.997 11.989 L 9.497 7.989 L 2.497 7.989 L 5.997 11.989 Z' />
    </SortArrows>
  );
};

export const SortArrowsDesc: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <SortArrows {...props}>
      <path fill='currentColor' d='M 2.497 3.989 L 9.497 3.989 L 5.997 -0.011 L 2.497 3.989 Z' />
      <path fill='var(--color-primary-dark)' d='M 5.997 11.989 L 9.497 7.989 L 2.497 7.989 L 5.997 11.989 Z' />
    </SortArrows>
  );
};
