import React, { FC } from 'react';

export const MicrosoftIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' {...props}>
      <rect x='0' y='0' width='11' height='11' />
      <rect x='0' y='13' width='11' height='11' />
      <rect x='13' y='0' width='11' height='11' />
      <rect x='13' y='13' width='11' height='11' />
    </svg>
  );
};
