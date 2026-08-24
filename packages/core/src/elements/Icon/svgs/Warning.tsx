import React, { FC } from 'react';
import classNames from 'classnames';

export const Warning: FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        d='M22.824 18.794L13.323.98c-.564-1.059-2.082-1.059-2.648 0L1.176 18.794C.644 19.792 1.368 21 2.501 21h19c1.131 0 1.855-1.207 1.323-2.206zM12 18c-.828 0-1.5-.672-1.5-1.5S11.172 15 12 15s1.5.672 1.5 1.5S12.828 18 12 18zm1.5-4.5h-3v-6h3v6z'
        transform='translate(-809 -382) translate(745 184) translate(32 146) translate(32 52) translate(0 1.5)'
      />
    </svg>
  );
};
