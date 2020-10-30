import React from 'react';
import { IconNames, IconProps } from '@frontegg/react-core';
import { Icon as SemanticIcon, IconProps as SemanticIconProps } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import classNames from 'classnames';

const iconMap: { [K in IconNames]: SemanticICONS } = {
  back: 'angle left',
  'up-arrow': 'angle up',
  'down-arrow': 'angle down',
  'left-arrow': 'angle left',
  'right-arrow': 'angle right',
  visibility: 'eye',
  'visibility-off': 'eye slash',
  copy: 'copy',
  checkmark: 'checkmark',
  indeterminate: 'minus',
  warning: 'warning sign',
  image: 'image',
  delete: 'trash',
  filters: 'trash',
  'sort-arrows': 'trash',
  'sort-arrows-asc': 'trash',
  'sort-arrows-desc': 'trash',
  'more-vert': 'ellipsis vertical',
  search: 'search',
  'person-add': 'add user',
  'vertical-dots': 'ellipsis vertical',
  send: 'send',
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
