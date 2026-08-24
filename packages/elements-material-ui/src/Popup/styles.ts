import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    box: {
      pointerEvents: 'all',
      padding: theme.spacing(2),
    },
  })
);
