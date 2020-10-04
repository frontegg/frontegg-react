import React, { FC, useCallback, forwardRef } from 'react';
import { Popover, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: theme.spacing(2),
    },
  })
);

export const PopupClick = forwardRef<any, any>((props, ref) => {
  const { trigger, content, anchorOrigin, transformOrigin, mountNode } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    },
    [setAnchorEl, setOpen]
  );

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
      {React.cloneElement(trigger as React.ReactElement<any>, {
        'aria-describedby': 'simple-popover',
        className: 'fe-m-popup-trigger',
        onClick: handleClick,
        ref: ref,
      })}
      <Popover
        id='simple-popover'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={mountNode}
        anchorOrigin={{
          vertical: anchorOrigin.vertical,
          horizontal: anchorOrigin.horizontal,
        }}
        transformOrigin={{
          vertical: transformOrigin.vertical,
          horizontal: transformOrigin.horizontal,
        }}
      >
        <Box className={`${classes.box} fe-m-popup-content`}>{content}</Box>
      </Popover>
    </div>
  );
});
