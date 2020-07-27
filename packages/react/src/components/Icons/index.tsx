import React, { FC } from 'react';


export const ArrowSVG: FC<React.HTMLAttributes<SVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 12 12' {...props}>
    <path d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 0 0 .293 4.707l5 5a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414z'/>
  </svg>
);

export const SettingSVG: FC<React.HTMLAttributes<SVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 16 16' {...props}>
    <path
      d='M15.716 7.504l-3.429-6A.996.996 0 0 0 11.42 1H4.58a.999.999 0 0 0-.868.504l-3.429 6a.998.998 0 0 0 0 .992l3.429 6A.999.999 0 0 0 4.58 15h6.839c.359 0 .69-.192.868-.504l3.429-6a.998.998 0 0 0 0-.992zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'/>
  </svg>
);

export const CalendarSVG: FC<React.HTMLAttributes<SVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.378 27.697" {...props}>
    <path
      d="M3.957 0v2.638H1.32A1.319 1.319 0 000 3.957v22.421a1.319 1.319 0 001.32 1.319h23.739a1.319 1.319 0 001.319-1.319V3.957a1.319 1.319 0 00-1.318-1.319h-2.64V0h-3.955v2.638H7.913V0zM2.638 10.551h21.1v14.508h-21.1zm7.254 3.959v6.595h6.595V14.51z"/>
  </svg>
);

export const ShareIcon: FC<React.HTMLAttributes<SVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.96 8.96" {...props}>
    <g transform="translate(-2.5 -2.5)">
      <g transform="translate(2.5 2.5)">
        <path
          d="M8.536 28.136H3.575v-4.961h2.65L7.3 22.1H3.038a.537.537 0 0 0-.538.538v6.036a.537.537 0 0 0 .538.538h6.036a.537.537 0 0 0 .538-.538V24.42L8.536 25.5z"
          transform="translate(-2.5 -20.251)"/>
        <path
          d="M46.923 2.5h-2.744a.538.538 0 1 0 0 1.075h1.452L42.406 6.8a.535.535 0 0 0 0 .755.524.524 0 0 0 .755 0l3.225-3.225v1.452a.538.538 0 0 0 1.075 0V3.038a.531.531 0 0 0-.538-.538z"
          transform="translate(-38.501 -2.5)"/>
      </g>
    </g>
  </svg>
);
