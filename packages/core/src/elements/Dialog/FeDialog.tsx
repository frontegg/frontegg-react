import React, { FC } from 'react';
import { DialogProps } from './interfaces';
import Dialog from 'rc-dialog';
import './FeDialog.scss';

export const FeDialog: FC<DialogProps> = ({ children, open, header, ...props }) => {
  return (
    <Dialog
      {...props}
      visible={open}
      title={header}
      width={600}
      prefixCls='fe-dialog'
      animation='zoom'
      maskAnimation='fade'
    >
      {children}
    </Dialog>
  );
};
