import React, { FC } from 'react';
import { DialogProps } from '@frontegg/react-core';
import {
  Dialog as MaterialDialog,
  DialogProps as MaterialDialogProps,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import './style.scss';

const mapSize: any = {
  mini: 'xs',
  tiny: 'xs',
  small: 'sm',
  large: 'lg',
  fullscreen: 'xl',
};
const dialogPropsMapper = (props: DialogProps): MaterialDialogProps => ({
  open: props.open ?? false,
  onClose: props.onClose,
  className: props.className,
  maxWidth: props.size ? mapSize[props.size] : 'md',
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
