import React from 'react';
import classNames from 'classnames';
import { FormProps } from '@frontegg/react-core';
import './style.scss';

// const mapper = (props: FormProps) => ({
//   className: classNames('fe-form', props.className),
//   ...props,
// });

export class Form extends React.Component<FormProps> {
  render() {
    // const formProps = mapper(this.props);
    return this.props.children;
  }
}
