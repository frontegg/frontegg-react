import React from 'react';
import { IconProps, IconNames } from '@frontegg/react-core';
import classNames from 'classnames';
import {
  ArrowBackRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  KeyboardArrowRightRounded,
  KeyboardArrowLeftRounded,
  CheckRounded,
  DeleteRounded,
  FileCopyRounded,
  ImageRounded,
  IndeterminateCheckBoxRounded,
  WarningRounded,
  VisibilityOff,
  Visibility,
  MoreVert,
  Search,
  PersonAddRounded,
  MoreVertRounded,
  SendRounded,
} from '@material-ui/icons';
import './style.scss';

const iconMap: { [K in IconNames]: any } = {
  back: ArrowBackRounded,
  'up-arrow': KeyboardArrowUpRounded,
  'down-arrow': KeyboardArrowDownRounded,
  'left-arrow': KeyboardArrowLeftRounded,
  'right-arrow': KeyboardArrowRightRounded,
  indeterminate: IndeterminateCheckBoxRounded,
  checkmark: CheckRounded,
  copy: FileCopyRounded,
  warning: WarningRounded,
  image: ImageRounded,
  delete: DeleteRounded,
  visibility: Visibility,
  'visibility-off': VisibilityOff,
  filters: DeleteRounded,
  'sort-arrows': DeleteRounded,
  'sort-arrows-asc': DeleteRounded,
  'sort-arrows-desc': DeleteRounded,
  'more-vert': MoreVert,
  search: Search,
  'person-add': PersonAddRounded,
  'vertical-dots': MoreVertRounded,
  send: SendRounded,
};

export class Icon extends React.Component<IconProps> {
  render() {
    const IconComponent = iconMap[this.props.name];
    if (IconComponent) {
      return <IconComponent {...this.props} className={classNames('fe-icon', this.props.className)} />;
    }
  }
}
