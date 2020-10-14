import React, { FC, useCallback } from 'react';
import { IconButton } from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';

type FeTablePaginationProps<T extends object> = {
  count: number;
  page: number;
  rowsPerPage: number;
  pageOptions: number[];
  onChangePage: (e: any, nextPage: number) => void;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    display: 'flex',
    alignItems: 'center',
  },
}));

export const TablePaginationActions: FC<FeTablePaginationProps<any>> = <T extends object>(
  props: FeTablePaginationProps<T>
) => {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage, gotoPage } = props;

  const handleFirstPageButtonClick = useCallback(() => {
    gotoPage(0);
  }, []);

  const handleBackButtonClick = useCallback(
    (event: any) => {
      onChangePage(event, page - 1);
    },
    [page]
  );

  const handleNextButtonClick = useCallback(
    (event: any) => {
      onChangePage(event, page + 1);
    },
    [page]
  );

  const handleLastPageButtonClick = useCallback(() => {
    gotoPage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }, []);

  return (
    <div className={classes.root}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label='first page'>
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};
