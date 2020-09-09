import React from 'react';
import { InputProps } from '@frontegg/react-core';
import { Form, Input as SemanticInput, InputProps as SemanticInputProps } from 'semantic-ui-react';
import { Button } from '../Button';
import { FormInputProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormInput';

const mapper = (props: InputProps): SemanticInputProps | FormInputProps => {
  const { inForm, fullWidth, ...rest } = props;
  return {
    ...rest,
    fluid: fullWidth,
  } as any;
};

export class Input extends React.Component<InputProps> {
  render() {
    const { children, inForm, labelButton, label, ...rest } = this.props;
    let InputComponent: any = SemanticInput;
    let inputLabel: any = label;

    if (inForm) {
      InputComponent = Form.Input;
    }

    if (labelButton) {
      inputLabel = (
        <label className='fe-label__with-button'>
          {label}
          <Button {...labelButton} />
        </label>
      );
    }
    const inputProps = { ...mapper(rest), label: inputLabel };

    return <InputComponent {...inputProps}>{children}</InputComponent>;
  }
}
