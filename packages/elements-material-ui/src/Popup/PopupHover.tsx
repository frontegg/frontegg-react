import React, { forwardRef, MouseEvent, useCallback, useRef, useState } from 'react';
import { Popover, Box } from '@material-ui/core';
import classnames from 'classnames';
import { IPopoverProps } from './types';
import { useStyles } from './styles';

const debounceDelay = 100;
export const PopupHover = forwardRef<HTMLElement, IPopoverProps>((props, ref) => {
  const { trigger, content, anchorOrigin, transformOrigin, mountNode } = props;

  const debounceRef = useRef<number>(0);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const onMouseEnter = useCallback((e: MouseEvent<HTMLElement>) => {
    clearTimeout(debounceRef.current);
    setAnchorEl(e.currentTarget);
  }, []);
  const onMouseLeave = useCallback((e: MouseEvent<HTMLElement>) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, debounceDelay);
  }, []);

  const onMouseEnterPopup = useCallback((e: MouseEvent<HTMLElement>) => {
    clearTimeout(debounceRef.current);
  }, []);

  return (
    <>
      {React.cloneElement(trigger, { ref, onMouseEnter, onMouseLeave })}
      <Popover
        className={classes.popover}
        container={mountNode}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={() => setAnchorEl(null)}
        disableRestoreFocus
      >
        <Box
          className={classnames(classes.box, 'fe-material-popup-content')}
          onMouseEnter={onMouseEnterPopup}
          onMouseLeave={onMouseLeave}
        >
          {content}
        </Box>
      </Popover>
    </>
  );
});
