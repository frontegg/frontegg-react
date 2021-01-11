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

export const WebhookSvg: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const {
    xmlns = 'http://www.w3.org/2000/svg',
    viewBox = '0 0 23 22',
    className,
    width = '23',
    height = '22',
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
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M17.8011 16.5193H6.56484V17.8001C6.34656 19.1131 5.26472 20.1107 3.963 20.1107C2.50386 20.1107 1.321 18.8573 1.321 17.3112C1.321 16.3571 1.7714 15.5145 2.45919 15.0091L1.70158 13.8623C0.673111 14.6209 0 15.8827 0 17.3112C0 19.6303 1.7743 21.5104 3.963 21.5104C5.92582 21.5104 7.55535 19.9984 7.8708 18.0136H17.7477C17.9764 18.4306 18.4026 18.7109 18.8905 18.7109C19.6201 18.7109 20.2115 18.0842 20.2115 17.3112C20.2115 16.5381 19.6201 15.9114 18.8905 15.9114C18.4383 15.9114 18.0392 16.1522 17.8011 16.5193Z'
        fill='#8091A5'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M2.87798 16.7378C2.90102 16.6802 2.9283 16.6236 2.9599 16.5682C3.20495 16.1391 3.64859 15.8983 4.10547 15.896L9.10691 7.13783C7.63314 5.90829 7.20962 3.74655 8.19741 2.01681C9.29839 0.0888634 11.7357 -0.572318 13.6414 0.540024C14.8114 1.22294 15.5089 2.41559 15.6184 3.68082L14.2949 3.79813C14.2221 2.95441 13.7571 2.15904 12.9769 1.70365C11.7065 0.962084 10.0816 1.40287 9.34757 2.68817C8.62876 3.94689 9.03097 5.54876 10.2411 6.31098L10.9725 6.73786L5.30773 16.6575C5.4687 16.9974 5.48606 17.4007 5.33261 17.7645C5.14539 18.2769 4.65766 18.6422 4.08547 18.6422C3.35148 18.6422 2.75647 18.0411 2.75647 17.2995C2.75647 17.099 2.79998 16.9087 2.87798 16.7378Z'
        fill='#8091A5'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M11.3567 5.15863L16.9714 15.3568L17.64 14.9519L17.6514 14.9725C17.6569 14.9691 17.6624 14.9658 17.668 14.9624C18.9408 14.1918 20.5624 14.6383 21.2899 15.9597C22.0174 17.2811 21.5753 18.977 20.3025 19.7477C19.5179 20.2227 18.6007 20.2352 17.8421 19.8654L17.2757 21.1231C18.4126 21.6753 19.786 21.6555 20.9612 20.944C22.8704 19.788 23.5334 17.2441 22.4422 15.262C21.4569 13.4724 19.3783 12.7526 17.5786 13.4805L12.5967 4.43165C12.8113 4.02128 12.8234 3.50943 12.5856 3.07758C12.2219 2.41687 11.4111 2.19362 10.7747 2.57893C10.1383 2.96424 9.91726 3.81221 10.281 4.47292C10.5122 4.89283 10.9239 5.13604 11.3567 5.15863Z'
        fill='#8091A5'
      />
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

export const CheckSvg: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const {
    xmlns = 'http://www.w3.org/2000/svg',
    viewBox = '0 0 100 100',
    className,
    width = '100',
    height = '100',
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
      <path d='M74.984 26.078l-3.53 3.563c-9.735 9.755-20.12 20.828-29.845 30.718L28.172 49.297l-3.875-3.188-6.344 7.72 3.844 3.187 17 14 3.531 2.906 3.188-3.219c10.769-10.792 22.435-23.413 33-34l3.53-3.562-7.062-7.063z' />
    </svg>
  );
};
