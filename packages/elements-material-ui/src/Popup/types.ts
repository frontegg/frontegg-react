import { PopupProps } from '@frontegg/react-core';

type positions = {
  vertical: any;
  horizontal: any;
};

export interface IPopoverProps extends PopupProps {
  anchorOrigin: positions;
  transformOrigin: positions;
}
