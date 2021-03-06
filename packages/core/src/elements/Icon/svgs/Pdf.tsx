import React, { FC } from 'react';
import classNames from 'classnames';

export const Pdf: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const {
    xmlns = 'http://www.w3.org/2000/svg',
    viewBox = '0 0 21 21',
    className,
    width = '21px',
    height = '21px',
    ...svgProps
  } = props;
  return (
    <svg
      className={classNames('fe-icon', className)}
      {...svgProps}
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns={xmlns}
    >
      <g transform='translate(0 0)'>
        <path
          d='M22.267,14.586a.909.909,0,0,0-.895.895V26.124a1.611,1.611,0,0,1-1.6,1.6H7.319a1.611,1.611,0,0,1-1.6-1.6V13.667a1.611,1.611,0,0,1,1.6-1.6H17.744a.895.895,0,0,0,0-1.79H7.319a3.4,3.4,0,0,0-3.386,3.386V26.124A3.4,3.4,0,0,0,7.319,29.51H19.776a3.4,3.4,0,0,0,3.386-3.386V15.481A.893.893,0,0,0,22.267,14.586Z'
          transform='translate(-3.933 -8.032)'
        ></path>
        <path
          d='M37.119,3.864a.895.895,0,0,0,0,1.79h3.048L31.821,14a.906.906,0,0,0,0,1.258.876.876,0,0,0,1.258,0l8.441-8.441V9.863a.895.895,0,1,0,1.79,0v-6Z'
          transform='translate(-21.88 -3.864)'
        ></path>
        <path
          d='M12.834,40.572H14.7a3.351,3.351,0,0,1,.726.073,1.513,1.513,0,0,1,.6.242,1.256,1.256,0,0,1,.411.46,1.887,1.887,0,0,1,0,1.451,1.273,1.273,0,0,1-.387.484,1.556,1.556,0,0,1-.581.242,3.352,3.352,0,0,1-.726.073h-.8V45.53H12.858V40.572Zm1.088,2.1h.726a1.178,1.178,0,0,0,.29-.024.724.724,0,0,0,.242-.1.448.448,0,0,0,.169-.194.516.516,0,0,0,.073-.29.5.5,0,0,0-.314-.484.67.67,0,0,0-.314-.073c-.121,0-.218-.024-.314-.024h-.556v1.185Z'
          transform='translate(-9.714 -27.704)'
        ></path>
        <path
          d='M25.461,40.572h1.645a4.439,4.439,0,0,1,1.137.145,2.823,2.823,0,0,1,.943.435,1.98,1.98,0,0,1,.629.774,2.426,2.426,0,0,1,.242,1.161,2.46,2.46,0,0,1-.218,1.064,2.393,2.393,0,0,1-.6.774,2.906,2.906,0,0,1-.895.484,3.915,3.915,0,0,1-1.064.169h-1.79V40.572Zm1.088,3.967h.581a3.283,3.283,0,0,0,.7-.073,1.326,1.326,0,0,0,.556-.266,1.113,1.113,0,0,0,.387-.484,1.615,1.615,0,0,0,.145-.726,1.272,1.272,0,0,0-.145-.629,1.3,1.3,0,0,0-.363-.435,1.7,1.7,0,0,0-.556-.266,2.7,2.7,0,0,0-.653-.073h-.653Z'
          transform='translate(-17.914 -27.704)'
        ></path>
        <path
          d='M40.848,40.572h3.338v1.016H41.936V42.6h2.08V43.62h-2.08v1.935H40.848Z'
          transform='translate(-27.908 -27.704)'
        ></path>
      </g>
    </svg>
  );
};
