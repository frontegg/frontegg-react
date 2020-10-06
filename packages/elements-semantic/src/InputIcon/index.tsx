import React from 'react';
import { InputIconProps } from '@frontegg/react-core';
import { Form, Input as SemanticInputIcon, InputProps as SemanticInputIconProps } from 'semantic-ui-react';
import { Button } from '../Button';
import { FormInputProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormInput';
import classNames from 'classnames';
import './style.scss';

const mapper = (props: InputIconProps): SemanticInputIconProps | FormInputProps => {
  const { inForm, fullWidth, className, ...rest } = props;
  return {
    ...rest,
    fluid: fullWidth,
    className: classNames('fe-InputIcon', className),
  } as any;
};

export class InputIcon extends React.Component<InputIconProps> {
  render() {
    const { children, inForm, labelButton, label, ...rest } = this.props;
    let InputIconComponent: any = SemanticInputIcon;
    let InputIconLabel: any = label;

    if (inForm) {
      InputIconComponent = Form.Input;
    }

    if (labelButton) {
      InputIconLabel = (
        <label className='fe-label__with-button'>
          {label}
          <Button {...labelButton} />
        </label>
      );
    }
    const InputIconProps = { ...mapper(rest), label: InputIconLabel };

    return <InputIconComponent {...InputIconProps}><div>eee</div>{children}</InputIconComponent>;
  }
}
