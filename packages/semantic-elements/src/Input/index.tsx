import React from 'react';
import { InputProps } from '@frontegg/react-core';
import { Form, Input as SemanticInput, InputProps as SemanticInputProps } from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';


const mapper = (props: InputProps): SemanticInputProps => {
  const { inForm, inFormik, fullWidth, error,...rest } = props;
  return {
    ...rest,
    fluid: fullWidth,
  };
};

export class Input extends React.Component<InputProps> {
  render() {
    const { children, inForm, inFormik, name, onChange, ...rest } = this.props;
    let InputComponent: any = SemanticInput;
    if (inForm || inFormik) {
      InputComponent = Form.Input;
    }
    if (inFormik) {
      return <Field>
        {({ form: { values, handleBlur, handleChange, errors, touched } }: FieldProps) => {
          return <InputComponent {...mapper(rest)}
                                 name={name}
                                 values={values[name ?? '']}
                                 onChange={onChange ?? handleChange(name) as any}
                                 onBlur={handleBlur}
                                 error={!!touched[name ?? ''] && errors[name ?? '']}
          >
            {children}
          </InputComponent>;
        }
        }
      </Field>;
    }

    return <InputComponent {...mapper(rest)}>
      {children}
    </InputComponent>;
  }
}
