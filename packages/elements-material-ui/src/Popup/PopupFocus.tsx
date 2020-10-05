import React, { forwardRef, useCallback } from 'react';
import { Popover, Box } from '@material-ui/core';
import classnames from 'classnames';
import { IPopoverProps } from './types';
import { useStyles } from './styles';

export const PopupFocus = forwardRef<HTMLElement, IPopoverProps>((props, ref) => {
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

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setOpen(false);
  }, []);

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement<any>, {
        className: 'fe-m-popup-trigger',
        onFocus: handleFocus,
        ref: ref,
      })}
      <Popover
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
        <Box className={classnames(classes.box, 'fe-m-popup-content')}>{content}</Box>
      </Popover>
    </>
  );
});
