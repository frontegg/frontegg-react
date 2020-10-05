import React, { forwardRef, MouseEvent, useCallback } from 'react';
import { Popover, Box } from '@material-ui/core';
import classnames from 'classnames';
import { IPopoverProps } from './types';
import { useStyles } from './styles';

export const PopupHover = forwardRef<HTMLElement, IPopoverProps>((props, ref) => {
  const { trigger, content, anchorOrigin, transformOrigin, mountNode } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [anchorElRect, setAnchorElRect] = React.useState({ fromX: 0, toX: 0, fromY: 0, toY: 0 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (
        e.pageX < anchorElRect.fromX ||
        e.pageX > anchorElRect.toX ||
        e.pageY < anchorElRect.fromY ||
        e.pageY > anchorElRect.toY
      ) {
        setOpen(false);
        setAnchorEl(null);
      }
    },
    [anchorElRect]
  );

  const onMouseEnter = useCallback((e: MouseEvent<HTMLElement>) => {
    const { x: fromX, y: fromY, width, height } = e.currentTarget.getBoundingClientRect();
    const toX = fromX + width;
    const toY = fromY + height;
    setAnchorElRect({ fromX, fromY, toX, toY });
    setAnchorEl(e.currentTarget);
    setOpen(true);
  }, []);

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement<any>, {
        className: 'fe-m-popup-trigger',
        ref: ref,
        onMouseEnter,
      })}
      <Popover
        container={mountNode}
        open={open}
        BackdropProps={{
          onMouseMove,
          style: {
            backgroundColor: 'inherit',
          },
        }}
        anchorEl={anchorEl}
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
