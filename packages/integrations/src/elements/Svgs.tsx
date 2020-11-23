import React, { FC } from 'react';
import classNames from 'classnames';

export const EmailSvg: FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
      <path d='M0 0h24v24H0z' fill='none' />
      <path
        fill='#fa6400'
        d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
      />
    </svg>
  );
};

export const BellSvg: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const {
    xmlns = 'http://www.w3.org/2000/svg',
    viewBox = '0 0 34 40',
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
      <g transform='translate(-747 -636) translate(296 292) translate(320 264) translate(131 80)'>
        <path
          fill='#9381E7'
          d='M21.417 35.667c.036 2.3-1.8 4.196-4.1 4.233-2.302.037-4.197-1.799-4.234-4.1.008-.573.127-1.139.35-1.667h7.5c.28.467.445.992.484 1.534zM6.067 15.717c-.115-4.612 2.498-8.858 6.666-10.834-.045-.214-.073-.431-.083-.65.099-2.182 1.878-3.91 4.062-3.945C18.896.252 20.731 1.922 20.9 4.1c.025.21.025.423 0 .633 4.289 1.863 7.124 6.027 7.283 10.7 0 0 .117 8.334 3.25 10.284.1 0 1.884.85 1.884 2.383s-1.767 2.683-3.967 2.7H5.55c-2.183 0-4.1-.917-4-2.383.15-.983.773-1.83 1.667-2.267 3.116-2.117 2.85-10.433 2.85-10.433z'
        />
        <circle cx='27.5' cy='11.667' r='5.833' fill='#FFBC07' />
      </g>
    </svg>
  );
};

export const SlackSvg: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const {
    xmlns = 'http://www.w3.org/2000/svg',
    viewBox = '0 0 40 40',
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
      <g>
        <path
          fill='#E01E5A'
          d='M8.516 4.258c0 2.29-1.87 4.161-4.161 4.161-2.29 0-4.161-1.87-4.161-4.16 0-2.291 1.87-4.162 4.16-4.162h4.162v4.161zM10.613 4.258c0-2.29 1.87-4.161 4.161-4.161 2.29 0 4.161 1.87 4.161 4.161v10.42c0 2.29-1.87 4.16-4.16 4.16-2.291 0-4.162-1.87-4.162-4.16V4.257z'
          transform='translate(-424 -372) translate(296 292) translate(128 80) translate(0 20.968)'
        />
        <path
          fill='#36C5F0'
          d='M14.774 8.516c-2.29 0-4.161-1.87-4.161-4.161 0-2.29 1.87-4.161 4.161-4.161 2.29 0 4.161 1.87 4.161 4.16v4.162h-4.16zM14.774 10.613c2.29 0 4.161 1.87 4.161 4.161 0 2.29-1.87 4.161-4.16 4.161H4.354c-2.29 0-4.161-1.87-4.161-4.16 0-2.291 1.87-4.162 4.16-4.162h10.42z'
          transform='translate(-424 -372) translate(296 292) translate(128 80)'
        />
        <path
          fill='#2EB67D'
          d='M10.516 14.774c0-2.29 1.871-4.161 4.161-4.161 2.29 0 4.162 1.87 4.162 4.161 0 2.29-1.871 4.161-4.162 4.161h-4.16v-4.16zM8.42 14.774c0 2.29-1.872 4.161-4.162 4.161s-4.161-1.87-4.161-4.16V4.354c0-2.29 1.87-4.161 4.161-4.161 2.29 0 4.161 1.87 4.161 4.16v10.42z'
          transform='translate(-424 -372) translate(296 292) translate(128 80) translate(20.968)'
        />
        <path
          fill='#ECB22E'
          d='M4.258 10.516c2.29 0 4.161 1.871 4.161 4.161 0 2.29-1.87 4.162-4.16 4.162-2.291 0-4.162-1.871-4.162-4.162v-4.16h4.161zM4.258 8.42C1.968 8.42.097 6.547.097 4.257S1.967.097 4.258.097h10.42c2.29 0 4.16 1.87 4.16 4.161 0 2.29-1.87 4.161-4.16 4.161H4.257z'
          transform='translate(-424 -372) translate(296 292) translate(128 80) translate(20.968 20.968)'
        />
      </g>
    </svg>
  );
};

export const SmsSvg: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const {
    xmlns = 'http://www.w3.org/2000/svg',
    viewBox = '0 0 448 512',
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
        fill='#fa6400'
        d='M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48zm-16.39 307.37l-15 65A15 15 0 0 1 354 416C194 416 64 286.29 64 126a15.7 15.7 0 0 1 11.63-14.61l65-15A18.23 18.23 0 0 1 144 96a16.27 16.27 0 0 1 13.79 9.09l30 70A17.9 17.9 0 0 1 189 181a17 17 0 0 1-5.5 11.61l-37.89 31a231.91 231.91 0 0 0 110.78 110.78l31-37.89A17 17 0 0 1 299 291a17.85 17.85 0 0 1 5.91 1.21l70 30A16.25 16.25 0 0 1 384 336a17.41 17.41 0 0 1-.39 3.37z'
      />
    </svg>
  );
};
