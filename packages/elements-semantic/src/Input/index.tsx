import React from 'react';
import { InputProps } from '@frontegg/react-core';
import { Form, Input as SemanticInput, InputProps as SemanticInputProps } from 'semantic-ui-react';
import { Button } from '../Button';
import { FormInputProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormInput';
import classNames from 'classnames';
import './style.scss';

const mapper = (props: InputProps): SemanticInputProps | FormInputProps => {
  const { inForm, fullWidth, className, ...rest } = props;
  return {
    ...rest,
    fluid: fullWidth,
    className: classNames('fe-input', className),
  } as any;
};

export class Input extends React.Component<InputProps> {
  render() {
    const { children, labelButton, label } = this.props;
    let inputLabel: any = label;

    if (labelButton) {
      inputLabel = (
        <label className='fe-label__with-button'>
          {label}
          <Button {...labelButton} />
        </label>
      );
    }
    const inputProps = { ...mapper(this.props), label: inputLabel };

    return <Form.Input {...inputProps}>{children}</Form.Input>;
  }
}
