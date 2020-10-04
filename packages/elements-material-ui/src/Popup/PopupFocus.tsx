import React, { forwardRef, useCallback } from 'react';
import { Popover, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: theme.spacing(2),
    },
  })
);

export const PopupFocus = forwardRef<any, any>((props, ref) => {
  const { trigger, content, anchorOrigin, transformOrigin, mountNode } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [focused, setFocused] = React.useState<boolean>(false);

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      if (focused) {
        setFocused(false);
      } else {
        setAnchorEl(event.currentTarget);
        setOpen(true);
        setFocused(true);
      }
    },
    [focused]
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
        onFocus: handleFocus,
      })}
      <Popover
        ref={ref}
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
