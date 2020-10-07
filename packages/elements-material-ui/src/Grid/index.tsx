import React, { forwardRef } from 'react';
import { ButtonProps, GridProps } from '@frontegg/react-core';
import { Grid as MaterialGrid, GridProps as MaterialGridProps } from '@material-ui/core';


const mapperMaterialProps = (props: GridProps): MaterialGridProps => ({
  ...props,
});


export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  return <MaterialGrid ref={ref} {...mapperMaterialProps(props)} />;
});
