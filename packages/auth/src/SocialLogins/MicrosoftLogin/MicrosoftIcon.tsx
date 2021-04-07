import React, { FC } from 'react';

export const MicrosoftIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 19 19' fill='white' {...props}>
      <rect x='0' y='0' width='9' height='9' />
      <rect x='0' y='10' width='9' height='9' />
      <rect x='10' y='0' width='9' height='9' />
      <rect x='10' y='10' width='9' height='9' />
    </svg>
  );
};
