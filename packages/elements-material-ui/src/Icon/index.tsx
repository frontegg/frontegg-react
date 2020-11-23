import React from 'react';
import { IconProps, IconNames } from '@frontegg/react-core';
import classNames from 'classnames';
import {
  Edit,
  Search,
  Visibility,
  CheckRounded,
  ImageRounded,
  DeleteRounded,
  VisibilityOff,
  WarningRounded,
  FileCopyRounded,
  MoreVertRounded,
  SendRounded,
  Cached,
  CalendarToday,
  FlashOn,
  PictureAsPdf,
  GridOn,
  ArrowBackRounded,
  PersonAddRounded,
  KeyboardArrowUpRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  IndeterminateCheckBoxRounded,
} from '@material-ui/icons';
import './style.scss';

const iconMap: { [K in IconNames]: any } = {
  'down-arrow': KeyboardArrowDownRounded,
  'left-arrow': KeyboardArrowLeftRounded,
  'person-add': PersonAddRounded,
  'right-arrow': KeyboardArrowRightRounded,
  'sort-arrows-asc': DeleteRounded,
  'sort-arrows-desc': DeleteRounded,
  'sort-arrows': DeleteRounded,
  'up-arrow': KeyboardArrowUpRounded,
  'vertical-dots': MoreVertRounded,
  'visibility-off': VisibilityOff,
  back: ArrowBackRounded,
  checkmark: CheckRounded,
  copy: FileCopyRounded,
  delete: DeleteRounded,
  edit: Edit,
  filters: DeleteRounded,
  image: ImageRounded,
  indeterminate: IndeterminateCheckBoxRounded,
  search: Search,
  send: SendRounded,
  refresh: Cached,
  'calendar-today': CalendarToday,
  flash: FlashOn,
  pdf: PictureAsPdf,
  csv: GridOn,
  visibility: Visibility,
  warning: WarningRounded,
};

export class Icon extends React.Component<IconProps> {
  render() {
    const IconComponent = iconMap[this.props.name];
    if (IconComponent) {
      return <IconComponent {...this.props} className={classNames('fe-icon', this.props.className)} />;
    }
  }
}
