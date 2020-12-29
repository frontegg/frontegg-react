import React, { FC } from 'react';
import classNames from 'classnames';

export const Close: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const {
    xmlns = 'http://www.w3.org/2000/svg',
    viewBox = '0 0 24 24',
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
        d='M1.613.21l.094.083L8 6.585 14.293.293c.39-.39 1.024-.39 1.414 0 .36.36.388.928.083 1.32l-.083.094L9.415 8l6.292 6.293c.39.39.39 1.024 0 1.414-.36.36-.928.388-1.32.083l-.094-.083L8 9.415l-6.293 6.292c-.39.39-1.024.39-1.414 0-.36-.36-.388-.928-.083-1.32l.083-.094L6.585 8 .293 1.707c-.39-.39-.39-1.024 0-1.414.36-.36.928-.388 1.32-.083z'
        transform='translate(-1142 -286) translate(730 262) translate(412 24) translate(4 4)'
      />
    </svg>
  );
};
