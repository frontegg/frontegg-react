import React, { useCallback, forwardRef } from 'react';
import { Popover, Box } from '@material-ui/core';
import classnames from 'classnames';
import { useStyles } from './styles';
import { IPopoverProps } from './types';

export const PopupClick = forwardRef<HTMLElement, IPopoverProps>((props, ref) => {
  const { trigger, content, anchorOrigin, transformOrigin, mountNode } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setOpen(false);
  }, []);

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement<any>, {
        className: 'fe-m-popup-trigger',
        onClick: handleClick,
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
