import React, { FC } from 'react';
import { DialogProps } from './interfaces';
import Dialog from 'rc-dialog';
import './FeDialog.scss';

export const FeDialog: FC<DialogProps> = (props) => {
  const { open, header, children, onClose } = props;
  return (
    <Dialog
      visible={open}
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
