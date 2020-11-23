import React from 'react';
import { IconNames, IconProps } from '@frontegg/react-core';
import { Icon as SemanticIcon, IconProps as SemanticIconProps } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import classNames from 'classnames';

const iconMap: { [K in IconNames]: SemanticICONS } = {
  'down-arrow': 'angle down',
  'left-arrow': 'angle left',
  'person-add': 'add user',
  'right-arrow': 'angle right',
  'sort-arrows-asc': 'trash',
  'sort-arrows-desc': 'trash',
  'sort-arrows': 'trash',
  'up-arrow': 'angle up',
  'vertical-dots': 'ellipsis vertical',
  'visibility-off': 'eye slash',
  back: 'angle left',
  checkmark: 'checkmark',
  copy: 'copy',
  delete: 'trash',
  edit: 'edit outline',
  filters: 'trash',
  image: 'image',
  indeterminate: 'minus',
  search: 'search',
  send: 'send',
  refresh: 'refresh',
  'calendar-today': 'calendar outline',
  flash: 'lightning',
  pdf: 'file pdf',
  csv: 'grid layout',
  visibility: 'eye',
  warning: 'warning sign',
};
const mapper = (props: IconProps): SemanticIconProps => ({
  size: props.size === 'medium' ? undefined : props.size,
  name: iconMap[props.name] ?? props.name,
  className: classNames('fe-icon', props.className),
  onClick: props.onClick,
});

export class Icon extends React.Component<IconProps> {
  render() {
    return <SemanticIcon {...mapper(this.props)} />;
  }
}
