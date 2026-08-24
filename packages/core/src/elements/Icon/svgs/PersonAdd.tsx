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

export const Profile: FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        d='M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z'
      />
    </svg>
  );
};
