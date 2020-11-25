import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { PaginationProps as MaterialPaginationProps, Pagination as MaterialPagination } from '@material-ui/lab';
import { PaginationProps } from '@frontegg/react-core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const mapper = ({ onChange, ...rest }: PaginationProps): MaterialPaginationProps => {
  return {
    ...rest,
  };
};

export const Pagination: FC<PaginationProps> = (props) => {
  const paginationProps = mapper(props);
  const { onChange } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MaterialPagination onChange={(e: any, p) => onChange?.(e, p)} {...paginationProps} />
    </div>
  );
};
