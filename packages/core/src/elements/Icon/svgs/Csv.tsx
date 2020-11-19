import React, { FC } from 'react';
import classNames from 'classnames';

export const Csv: FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        <g transform='translate(0 0)'>
          <g transform='translate(0 0)'>
            <path
              d='M22.219,14.575a.906.906,0,0,0-.893.893V26.082a1.606,1.606,0,0,1-1.592,1.592H7.31a1.606,1.606,0,0,1-1.592-1.592V13.658A1.606,1.606,0,0,1,7.31,12.066h10.4a.893.893,0,0,0,0-1.785H7.31a3.387,3.387,0,0,0-3.377,3.377V26.082A3.387,3.387,0,0,0,7.31,29.46H19.734a3.387,3.387,0,0,0,3.377-3.377V15.468A.891.891,0,0,0,22.219,14.575Z'
              transform='translate(-3.933 -8.037)'
            ></path>
            <path
              d='M37.1,3.864a.893.893,0,1,0,0,1.785h3.04l-8.323,8.323a.9.9,0,0,0,0,1.254.874.874,0,0,0,1.254,0l8.419-8.419v3.04a.893.893,0,0,0,1.785,0V3.864Z'
              transform='translate(-21.906 -3.864)'
            ></path>
            <path
              d='M15.939,41.554a.91.91,0,0,0-.386-.289,1.227,1.227,0,0,0-.531-.1,1.431,1.431,0,0,0-.555.121,1.5,1.5,0,0,0-.458.338,1.324,1.324,0,0,0-.289.507,1.8,1.8,0,0,0-.1.627,1.714,1.714,0,0,0,.1.627,1.735,1.735,0,0,0,.289.507,1.5,1.5,0,0,0,.434.338,1.431,1.431,0,0,0,.555.121,1.308,1.308,0,0,0,.6-.145,1.322,1.322,0,0,0,.434-.386l.893.675a2.069,2.069,0,0,1-.8.651,2.36,2.36,0,0,1-.989.217,2.971,2.971,0,0,1-1.061-.169,2.716,2.716,0,0,1-.844-.507,2.464,2.464,0,0,1-.555-.82,3.016,3.016,0,0,1,0-2.123,2.152,2.152,0,0,1,.555-.82,2.464,2.464,0,0,1,.844-.507,2.969,2.969,0,0,1,1.061-.193,2.658,2.658,0,0,1,.434.048,2.917,2.917,0,0,1,.434.121,1.341,1.341,0,0,1,.41.217,1.624,1.624,0,0,1,.362.338Z'
              transform='translate(-9.498 -27.514)'
            ></path>
            <path
              d='M28.535,41.3a.741.741,0,0,0-.362-.241,1.366,1.366,0,0,0-.434-.072.821.821,0,0,0-.241.024,1.008,1.008,0,0,0-.241.1.523.523,0,0,0-.169.145.408.408,0,0,0-.072.241.365.365,0,0,0,.169.338,1.619,1.619,0,0,0,.41.193c.169.048.362.121.555.169a2.275,2.275,0,0,1,.555.241,1.115,1.115,0,0,1,.41.41,1.2,1.2,0,0,1,.169.7,1.763,1.763,0,0,1-.145.724,1.651,1.651,0,0,1-.41.507,1.4,1.4,0,0,1-.6.289,2.49,2.49,0,0,1-.724.1,2.664,2.664,0,0,1-.893-.145,2.419,2.419,0,0,1-.772-.482l.772-.844a1.1,1.1,0,0,0,.41.338,1.315,1.315,0,0,0,.531.121.99.99,0,0,0,.265-.024.722.722,0,0,0,.241-.1.564.564,0,0,0,.169-.169.408.408,0,0,0,.072-.241.434.434,0,0,0-.169-.362,1.224,1.224,0,0,0-.434-.217c-.169-.048-.362-.121-.555-.169a2.275,2.275,0,0,1-.555-.241,1.4,1.4,0,0,1-.434-.41,1.09,1.09,0,0,1-.145-.651,1.575,1.575,0,0,1,.145-.7,1.651,1.651,0,0,1,.41-.507,1.8,1.8,0,0,1,.6-.314,2.23,2.23,0,0,1,.7-.1,2.755,2.755,0,0,1,.8.121,2.23,2.23,0,0,1,.7.386Z'
              transform='translate(-18.114 -27.334)'
            ></path>
            <path
              d='M36.846,40.365h1.23L39.283,43.6h.024l1.23-3.233h1.158l-2.026,4.921H38.8Z'
              transform='translate(-25.339 -27.603)'
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
