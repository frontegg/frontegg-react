import React, { FC } from 'react';
import { DialogProps } from '@frontegg/react-core';
import { Dialog as MaterialDialog, DialogProps as MaterialDialogProps } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import './style.scss';

const mapSize: any = {
  mini: 'xs',
  tiny: 'sm',
  small: 'md',
  large: 'lg',
  fullscreen: 'xl',
};
const dialogPropsMapper = (props: DialogProps): MaterialDialogProps => ({
  open: props.open ?? false,
  onClose: props.onClose,
  className: props.className,
  maxWidth: mapSize[props.size ?? 'small'],
  fullScreen: props.size === 'fullscreen',
  fullWidth: true,
});

export const Dialog: FC<DialogProps> = (props) => {
  const modalProps = dialogPropsMapper(props);
  return (
    <MaterialDialog {...modalProps}>
      <DialogTitle className='fe-dialog-header'>{props.header}</DialogTitle>
      <DialogContent className='fe-dialog-content'>{props.children}</DialogContent>
    </MaterialDialog>
  );
};
