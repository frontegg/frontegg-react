import React, { FC } from 'react';
import classNames from 'classnames';

export const List: FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
      <g transform='translate(-1.502 -5.866)'>
        <path
          id='Path_1573'
          d='M1.922 6.707h7.16a.42.42 0 0 0 0-.841h-7.16a.42.42 0 1 0 0 .841z'
          data-name='Path 1573'
        />
        <path
          id='Path_1574'
          d='M9.082 16.267h-7.16a.42.42 0 0 0 0 .841h7.16a.42.42 0 0 0 0-.841z'
          data-name='Path 1574'
          transform='translate(0 -7.879)'
        />
        <path
          id='Path_1575'
          d='M7.683 26.667H1.922a.42.42 0 1 0 0 .841h5.76a.42.42 0 1 0 0-.841z'
          data-name='Path 1575'
          transform='translate(0 -15.757)'
        />
      </g>
    </svg>
  );
};
