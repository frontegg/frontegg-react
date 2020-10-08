import React, { FC } from 'react';
import classNames from 'classnames';

export const UpArrow: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const {
    xmlns = 'http://www.w3.org/2000/svg',
    viewBox = '0 0 16 16',
    className,
    width = '2rem',
    height = '2rem',
    ...svgProps
  } = props;

  const children = props.children ?? (
    <path
      d='M 6 13.4 L 4.6 12 L 8.6 8 L 4.6 4 L 6 2.6 L 11.4 8 Z'
      fill='currentColor'
      fillRule='evenodd'
      transform='matrix(0, -1, 1, 0, 0, 16)'
    />
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

export const DownArrow: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <UpArrow {...props}>
      <path
        d='M 6 13.4 L 4.6 12 L 8.6 8 L 4.6 4 L 6 2.6 L 11.4 8 Z'
        fill='currentColor'
        fillRule='evenodd'
        transform='matrix(0, 1, -1, 0, 16, 0)'
      />
    </UpArrow>
  );
};

export const RightArrow: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <UpArrow {...props}>
      <path d='M 6 13.4 L 4.6 12 L 8.6 8 L 4.6 4 L 6 2.6 L 11.4 8 Z' fill='currentColor' fillRule='evenodd' />
    </UpArrow>
  );
};
export const LeftArrow: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <UpArrow {...props}>
      <path
        d='M 6 13.4 L 4.6 12 L 8.6 8 L 4.6 4 L 6 2.6 L 11.4 8 Z'
        fill='currentColor'
        fillRule='evenodd'
        transform='matrix(-1, 0, 0, -1, 16, 16)'
      />
    </UpArrow>
  );
};
