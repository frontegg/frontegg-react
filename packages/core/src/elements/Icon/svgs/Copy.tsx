import React, { FC } from 'react';
import classNames from 'classnames';

export const Copy: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const {
    xmlns = 'http://www.w3.org/2000/svg',
    viewBox = '0 0 16 16',
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
        d='M9 4H1c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h8c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1z'
        transform='translate(-1307 -522) translate(745 184) translate(562 338) translate(1)'
      />
      <path
        d='M13 0H3v2h9v11h2V1c0-.6-.4-1-1-1z'
        transform='translate(-1307 -522) translate(745 184) translate(562 338) translate(1)'
      />
    </svg>
  );
};
