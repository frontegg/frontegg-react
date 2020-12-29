import React, { FC } from 'react';
import { DialogProps } from './interfaces';
import Dialog from 'rc-dialog';
import './FeDialog.scss';

export const FeDialog: FC<DialogProps> = ({ children, open, header, onClose, ...props }) => {
  return (
    <Dialog
      {...props}
      visible={open}
      maskClosable={false}
      destroyOnClose={true}
      title={header}
      closable={true}
      onClose={() => onClose?.()}
      width={600}
      prefixCls='fe-dialog'
      animation='zoom'
      maskAnimation='fade'
    >
      {children}
    </Dialog>
  );
};
