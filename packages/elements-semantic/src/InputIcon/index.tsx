import React from 'react';
import { InputIconProps } from '@frontegg/react-core';
import { Form,Icon, Input as SemanticInputIcon, InputProps as SemanticInputIconProps } from 'semantic-ui-react';
import { Button } from '../Button';
import { FormInputProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormInput';
import classNames from 'classnames';
import './style.scss';

const mapper = (props: InputIconProps): SemanticInputIconProps | FormInputProps => {
  const { inForm, fullWidth, className, prefix, suffix, ...rest } = props;
  const data = {
    ...rest,
    fluid: fullWidth,
    className: classNames('fe-Input icon', className),
  } as any;

  if (prefix) {
    data.iconPosition = 'left';
  }
  return data;
};

export class InputIcon extends React.Component<InputIconProps> {
  render() {
    const { children, inForm, labelButton, label, ...rest } = this.props;
    let InputIconComponent: any = SemanticInputIcon;
    let InputIconLabel: any = label;
    let iconContent: any;

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

    if (rest.prefix) {
      iconContent = rest.prefix;
    } else if (rest.suffix) {
      iconContent = rest.suffix;
    }

    const InputIconProps = { ...mapper(rest), label: InputIconLabel };
    return (<InputIconComponent {...InputIconProps} icon>
            <input />
            {iconContent}
            {children}
            </InputIconComponent>);
  }
}
