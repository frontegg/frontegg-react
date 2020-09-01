import React from 'react';
import { IInput } from '@frontegg/react-core';
import { Form, Input as SemanticInput, InputProps } from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';


const mapper = (props: IInput): InputProps => {
  const { inForm, inFormik, fullWidth, ...rest } = props;
  return {
    ...rest,
    fluid: fullWidth,
  };
};

export class Input extends React.Component<IInput> {
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
                                 values={values[name]}
                                 onChange={onChange ?? handleChange(name) as any}
                                 onBlur={handleBlur}
                                 error={!!touched[name] && errors[name]}
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
