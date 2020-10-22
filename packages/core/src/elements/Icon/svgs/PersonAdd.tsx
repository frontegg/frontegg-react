import React, { FC } from 'react';
import classNames from 'classnames';

export const PersonAdd: FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        fill='currentColor'
        d='M 12 3 A 4 4 0 0 0 8 7 A 4 4 0 0 0 12 11 A 4 4 0 0 0 16 7 A 4 4 0 0 0 12 3 z M 18 12 C 14.7 12 12 14.7 12 18 C 12 21.3 14.7 24 18 24 C 21.3 24 24 21.3 24 18 C 24 14.7 21.3 12 18 12 z M 11.050781 14.046875 C 7.8907812 14.308875 3 15.796 3 18.5 L 3 21 L 10.587891 21 C 10.211891 20.073 10 19.062 10 18 C 10 16.56 10.384781 15.213875 11.050781 14.046875 z M 17 15 L 19 15 L 19 17 L 21 17 L 21 19 L 19 19 L 19 21 L 17 21 L 17 19 L 15 19 L 15 17 L 17 17 L 17 15 z'
      />
    </svg>
  );
};
