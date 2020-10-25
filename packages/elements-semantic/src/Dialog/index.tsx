import React, { FC } from 'react';
import { DialogProps } from '@frontegg/react-core';
import { Modal, ModalProps } from 'semantic-ui-react';
import './style.scss';
import classNames from 'classnames';

const dialogPropsMapper = (props: DialogProps): ModalProps => ({
  size: props.size,
  open: props.open,
  onOpen: props.onOpen,
  onClose: props.onClose,
  closeOnDimmerClick: props.closeOnDimmerClick,
  closeOnEscape: props.closeOnEscape,
  className: classNames('fe-semantic-dialog', props.className),
  dimmer: {
    className: 'fe-dimmer',
  },
});

export const Dialog: FC<DialogProps> = (props) => {
  const modalProps = dialogPropsMapper(props);
  return (
    <Modal {...modalProps}>
      <Modal.Header className='fe-dialog__header'>{props.header}</Modal.Header>
      <Modal.Content className='fe-dialog__content'>{props.children}</Modal.Content>
    </Modal>
  );
};
