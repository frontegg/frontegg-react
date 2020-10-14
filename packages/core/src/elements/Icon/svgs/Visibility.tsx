import React, { forwardRef } from 'react';
import classNames from 'classnames';

export const Visibility = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => {
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
      ref={ref}
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns={xmlns}
      className={classNames('fe-icon', className)}
    >
      <path
        d='M510.112,249.924c-4.032-5.845-100.928-143.253-254.101-143.253c-131.435,0-248.555,136.619-253.483,142.443
			c-3.371,3.968-3.371,9.792,0,13.781c4.928,5.824,122.048,142.443,253.483,142.443s248.555-136.619,253.483-142.443
			C512.587,259.204,512.864,253.892,510.112,249.924z M256.011,341.337c-47.061,0-85.333-38.272-85.333-85.333
			s38.272-85.333,85.333-85.333s85.333,38.272,85.333,85.333S303.072,341.337,256.011,341.337z'
      />
    </svg>
  );
});

export const VisibilityOff = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => {
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
      ref={ref}
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns={xmlns}
      className={classNames('fe-icon', className)}
    >
      <path
        d='M256.011,106.673c-131.435,0-248.555,136.619-253.483,142.443c-3.371,3.968-3.371,9.792,0,13.781
			c2.944,3.477,45.995,53.461,108.075,93.269l66.859-66.859c-4.352-10.24-6.784-21.483-6.784-33.301
			c0-47.061,38.272-85.333,85.333-85.333c11.819,0,23.061,2.432,33.301,6.784l54.976-54.976
			C317.493,112.902,288.075,106.673,256.011,106.673z'
      />

      <path
        d='M510.112,249.926c-2.731-3.947-48.021-67.691-124.16-108.779l58.944-58.944c4.16-4.16,4.16-10.923,0-15.083
			c-4.16-4.16-10.923-4.16-15.083,0L67.147,429.788c-4.16,4.16-4.16,10.923,0,15.083c2.069,2.091,4.8,3.136,7.531,3.136
			c2.731,0,5.461-1.045,7.552-3.115l66.88-66.88c32.96,16.085,69.312,27.328,106.901,27.328
			c131.435,0,248.555-136.619,253.483-142.443C512.587,259.206,512.864,253.894,510.112,249.926z M256.011,341.34
			c-19.691,0-37.589-6.976-52.053-18.197l119.189-119.189c11.221,14.464,18.197,32.363,18.197,52.053
			C341.344,303.068,303.072,341.34,256.011,341.34z'
      />
    </svg>
  );
});
