import React from 'react';
import { IconProps } from '@frontegg/react-core';
import { Icon as SemanticIcon, IconProps as SemanticIconProps } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import classNames from 'classnames';


const iconMap: { [name: string]: SemanticICONS } = {
  'left-arrow': 'arrow left',
};
const mapper = (props: IconProps): SemanticIconProps => ({
  size: props.size === 'medium' ? undefined : props.size,
  name: iconMap[props.name] ?? props.name,
  className: classNames('fe-icon', props.className),
});

export class Icon extends React.Component<IconProps> {
  render() {
    return <SemanticIcon {...mapper(this.props)}/>;
  }
}
