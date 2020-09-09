import React from 'react';
import { FronteggAuth } from './FronteggAuth';
import { CustomAuthWrapper } from './CustomAuthWrapper';
import './auth-examples.scss';
import { CustomAuthComponents } from './CustomAuthComponents';

enum Ex {
  'Frontegg',
  'CustomAuthWrapper',
  'CustomAuthComponents',
  'OnlyAuthAPI',
}

const selectedExample: any = Ex.CustomAuthComponents;
export const AuthExamples = () => {
  switch (selectedExample) {
    case Ex.Frontegg:
      return <FronteggAuth />;
    case Ex.CustomAuthWrapper:
      return <CustomAuthWrapper />;
    case Ex.CustomAuthComponents:
      return <CustomAuthComponents />;
    // case Ex.OnlyAuthAPI:
    //   return <OnlyAuthAPI />;
  }

  return null;
};
