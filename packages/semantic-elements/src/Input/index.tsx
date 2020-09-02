import React from 'react';
import { InputProps } from '@frontegg/react-core';
import { Form, Input as SemanticInput, InputProps as SemanticInputProps } from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';
import { Button } from '../Button';


const mapper = (props: InputProps): SemanticInputProps => {
  const { inForm, inFormik, fullWidth, error, ...rest } = props;
  return {
    ...rest,
    fluid: fullWidth,
  };
};

export class Input extends React.Component<InputProps> {
  render() {
    const { children, inForm, inFormik, name, labelButton, label, onChange, ...rest } = this.props;
    let InputComponent: any = SemanticInput;
    let inputLabel: any = label;
    if (inForm || inFormik) {
      InputComponent = Form.Input;
    }

    if (labelButton) {
      inputLabel = <label className='fe-label__with-button'>
        {label}
        <Button {...labelButton}/>
      </label>;
    }
    const inputProps = { ...mapper(rest), label: inputLabel };
    if (inFormik) {
      return <Field>
        {({ form: { values, handleBlur, handleChange, errors, touched } }: FieldProps) =>
          <InputComponent {...inputProps}
                          name={name}
                          values={values[name ?? '']}
                          onChange={onChange ?? handleChange(name) as any}
                          onBlur={handleBlur}
                          error={!!touched[name ?? ''] && errors[name ?? '']}>
            {children}
          </InputComponent>
        }
      </Field>;
    }

    return <InputComponent {...inputProps}>
      {children}
    </InputComponent>;
  }
}
