import React, { FC } from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';

export const FieldButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Field>
    {({ form: { isValid, dirty } }: FieldProps) => (
      <div className='fe-form-action'>
        <Button {...props} type='submit' disabled={!isValid || !dirty}>
          {children}
        </Button>
      </div>
    )}
  </Field>
);
