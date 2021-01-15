import React, { forwardRef } from 'react';
import { useFormikContext } from 'formik';
import { ElementsFactory } from '../../ElementsFactory';
import { ButtonProps } from './interfaces';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) =>
  React.createElement(ElementsFactory.getElement('Button'), { ...props, ref } as any)
);

export const FButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { isValid, dirty } = useFormikContext();
  const { formikDisableIfNotDirty, disabled, ...restProps } = props;
  const _disabled = disabled || !isValid || ((formikDisableIfNotDirty ?? true) && !dirty) || props.loading;
  return (
    <Button
      data-test-id='disabled-btn'
      ref={ref}
      inForm
      {...restProps}
      disabled={_disabled}
      size={props.size ?? props.type === 'submit' ? 'large' : undefined}
      fullWidth={props.fullWidth ?? true}
    />
  );
});
