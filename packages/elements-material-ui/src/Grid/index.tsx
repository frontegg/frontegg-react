import React, { forwardRef } from 'react';
import { ButtonProps, GridProps } from '@frontegg/react-core';
import { Grid as MaterialGrid, GridProps as MaterialGridProps } from '@material-ui/core';

const mapperMaterialProps = ({ justifyContent, ...restProps }: GridProps): MaterialGridProps => ({
  ...restProps,
  justify: justifyContent,
});

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  return <MaterialGrid ref={ref} {...mapperMaterialProps(props)} />;
});
