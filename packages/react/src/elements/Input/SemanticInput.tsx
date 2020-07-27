import React from 'react';
import { Form, Input, InputProps } from 'semantic-ui-react';
import { IInputProps } from './interfaces';


const mapper = (props: IInputProps): InputProps => {
  const {
    label,
    labelPosition,
    validateFunction,
    resetOnInvalid,
    invalidMessage,
    onInputBlur,
    onChange,
    isNumber,
    incrementFactor,
    fullWidth,
    ...rest
  } = props;
  return {
    ...rest,
    fluid: fullWidth,
  } as InputProps;
};

const checkValidation = (props: IInputProps) => {
  return true;
};
export default (props: IInputProps) => {
  const inputProps = mapper(props);

  const isValid = checkValidation(props);

  const input = <Input {...inputProps}
                       error={!isValid}
                       onChange={event => {
                         props.onChange?.(event, isValid);
                       }}/>;

  if (props.labelPosition == null || props.labelPosition === 'top' && props.label) {
    return <Form.Field>
      <label>{props.label}</label>
      {input}
    </Form.Field>;
  }
  return input;
}
