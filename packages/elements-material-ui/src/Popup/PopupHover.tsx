import React, { forwardRef, MouseEvent } from 'react';
import { Popover, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: theme.spacing(2),
    },
  })
);

export const PopupHover = forwardRef<any, any>((props, ref) => {
  const { trigger, content, anchorOrigin, transformOrigin, mountNode } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [anchorElRect, setAnchorElRect] = React.useState({ fromX: 0, toX: 0, fromY: 0, toY: 0 });

  return (
    <div>
      {React.cloneElement(trigger as React.ReactElement<any>, {
        'aria-describedby': 'simple-popover',
        className: 'fe-m-popup-trigger',
        ref: ref,
        onMouseEnter: (e: MouseEvent<HTMLElement>) => {
          const { x: fromX, y: fromY, width, height } = e.currentTarget.getBoundingClientRect();
          const toX = fromX + width;
          const toY = fromY + height;
          setAnchorElRect({ fromX, fromY, toX, toY });
          setAnchorEl(e.currentTarget);
          setOpen(true);
        },
      })}
      <Popover
        id='simple-popover'
        container={mountNode}
        open={open}
        BackdropProps={{
          onMouseMove: (e: MouseEvent) => {
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
          style: {
            backgroundColor: 'inherit',
          },
        }}
        PaperProps={{
          onMouseLeave: (e) => {
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
        <Box className={`${classes.box} fe-m-popup-content`}>{content}</Box>
      </Popover>
    </div>
  );
});
