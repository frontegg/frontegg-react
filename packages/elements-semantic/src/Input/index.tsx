import React from 'react';
import { InputProps } from '@frontegg/react-core';
import { Form, StrictInputProps, StrictTextAreaProps } from 'semantic-ui-react';
import { Button } from '../Button';
import { StrictFormInputProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormInput';
import classNames from 'classnames';
import './style.scss';

const mapper = (props: InputProps): StrictInputProps | StrictFormInputProps | StrictTextAreaProps => {
  const { inForm, fullWidth, className, prefixIcon, suffixIcon, multiline, ...rest } = props;
  const data = {
    ...rest,
    className: classNames('fe-semantic-input', className, { fluid: multiline && fullWidth }),
  } as any;

  if (!multiline) {
    data.fluid = fullWidth;
  }

  if (prefixIcon) {
    data.iconPosition = 'left';
    data.actionPosition = 'left';
  }
  return data;
};

export class Input extends React.Component<InputProps> {
  render() {
    const { children, labelButton, multiline, label, ...rest } = this.props;
    let inputLabel: JSX.Element | string | undefined = label;
    let iconContent: any;

    if (labelButton) {
      inputLabel = (
        <label className='fe-label__with-button'>
          {label}
          <Button {...labelButton} />
        </label>
      );
    }

    if (rest.prefixIcon) {
      iconContent = rest.prefixIcon;
    } else if (rest.suffixIcon) {
      iconContent = rest.suffixIcon;
    }

    const inputProps = { ...mapper(this.props), label: inputLabel };

    return multiline ? (
      <Form.TextArea {...(inputProps as StrictTextAreaProps)}></Form.TextArea>
    ) : rest.iconAction ? (
      <Form.Input
        {...(inputProps as StrictInputProps | StrictFormInputProps)}
        icon
        action={{
          icon: iconContent,
          onClick: rest.iconAction,
        }}
      >
        {children}
      </Form.Input>
    ) : (
      <Form.Input {...(inputProps as StrictInputProps | StrictFormInputProps)} icon>
        <input />
        {iconContent}
        {children}
      </Form.Input>
    );
  }
}
