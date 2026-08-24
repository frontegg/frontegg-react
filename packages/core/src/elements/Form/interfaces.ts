import React from 'react';

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  as?: string; // default is form
}
