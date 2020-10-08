import React from 'react';
import { IconProps, IconNames } from '@frontegg/react-core';
import classNames from 'classnames';
import {
  ArrowBackRounded,
  ArrowDownwardRounded,
  ArrowForwardRounded,
  ArrowUpwardRounded,
  CheckRounded,
  DeleteRounded,
  FileCopyRounded,
  ImageRounded,
  IndeterminateCheckBoxRounded,
  WarningRounded,
  VisibilityOff,
  Visibility
} from '@material-ui/icons';
import './style.scss';

const iconMap: { [K in IconNames]: any } = {
  'up-arrow': ArrowUpwardRounded,
  'down-arrow': ArrowDownwardRounded,
  'left-arrow': ArrowBackRounded,
  'right-arrow': ArrowForwardRounded,
  indeterminate: IndeterminateCheckBoxRounded,
  checkmark: CheckRounded,
  copy: FileCopyRounded,
  warning: WarningRounded,
  image: ImageRounded,
  delete: DeleteRounded,
  'visibility': Visibility,
  'visibility-off': VisibilityOff,
  'sort-arrows': DeleteRounded,
  'sort-arrows-asc': DeleteRounded,
  'sort-arrows-desc': DeleteRounded,
  filters: DeleteRounded,
};

export class Icon extends React.Component<IconProps> {
  render() {
    const IconComponent = iconMap[this.props.name];
    if (IconComponent) {
      return <IconComponent {...this.props} className={classNames('fe-icon', this.props.className)} />;
    }
  }
}
