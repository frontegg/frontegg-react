import React, { FC } from 'react';
import classNames from 'classnames';

export const Filters: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const {
    xmlns = 'http://www.w3.org/2000/svg',
    viewBox = '0 0 12 12',
    className,
    width = '2rem',
    height = '2rem',
    ...svgProps
  } = props;
  return (
    <svg
      {...svgProps}
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns={xmlns}
      className={classNames('fe-icon', className)}
    >
      <path
        fill='currentColor'
        d='M7 8c.552 0 1 .448 1 1s-.448 1-1 1H5c-.552 0-1-.448-1-1s.448-1 1-1zm2-4c.552 0 1 .448 1 1s-.448 1-1 1H3c-.552 0-1-.448-1-1s.448-1 1-1zm2-4c.552 0 1 .448 1 1s-.448 1-1 1H1c-.552 0-1-.448-1-1s.448-1 1-1z'
        transform='translate(-580 -322) translate(296 304) translate(96 16) translate(188 2) translate(0 1)'
      />
    </svg>
  );
};
