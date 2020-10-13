import { PopoverProps } from '@material-ui/core';
import { PopupProps } from '@frontegg/react-core';

export type IPopoverProps = Omit<PopupProps, 'vertical' | 'horizontal'> &
  Pick<PopoverProps, 'anchorOrigin'> &
  Pick<PopoverProps, 'transformOrigin'>;
