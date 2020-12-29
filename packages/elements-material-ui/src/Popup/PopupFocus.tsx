import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Popover, Box } from '@material-ui/core';
import classnames from 'classnames';
import { IPopoverProps } from './types';
import { useStyles } from './styles';

export const PopupFocus = forwardRef<HTMLElement, IPopoverProps>((props, ref) => {
  const { trigger, content, anchorOrigin, transformOrigin, mountNode } = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [focused, setFocused] = useState<boolean>(false);

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
    props.onClose?.();
  }, []);

  useEffect(() => {
    if (open) {
      props.onOpen?.();
    }
  }, [open]);
  return (
    <>
      {React.cloneElement(trigger, { onFocus: handleFocus, ref })}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={mountNode}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <Box className={classnames(classes.box, 'fe-m-popup-content')}>{content}</Box>
      </Popover>
    </>
  );
});
