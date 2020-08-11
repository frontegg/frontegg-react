import React, { FC } from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';

export const FieldButton: FC<ButtonProps & { disabledDirty?: boolean }> = ({ children, disabledDirty, ...props }) => (
  <Field>
    {({ form: { isValid, dirty } }: FieldProps) => {
      const disabled = !isValid || (disabledDirty ? false : !dirty);
      return <div className='fe-form-action'>
        <Button {...props} type='submit' {...(disabled ? { primary: undefined, disabled } : {})}>
          {children}
        </Button>
      </div>;
    }}
  </Field>
);
