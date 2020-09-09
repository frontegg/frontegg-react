import { ButtonProps } from './interfaces';
import React, { FC } from 'react';
import { ElementsFactory } from './ElementsFactory';
import { useFormikContext } from 'formik';

export const Button = (props: ButtonProps) => React.createElement(ElementsFactory.getElement('Button'), props);
export const FButton: FC<ButtonProps> = (props) => {
  const { isValid, dirty } = useFormikContext();
  const disableDirty = props.formikDisableIfNotDirty ?? true;
  return <Button {...props} disabled={!isValid || (disableDirty && !dirty)} fullWidth={props.fullWidth ?? true} />;
};
