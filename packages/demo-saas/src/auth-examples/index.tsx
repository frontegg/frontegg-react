import React, { FC } from 'react';
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

const selectedExample: any = Ex.Frontegg;

export const AuthExamples: FC = ({ children }) => {
  switch (selectedExample) {
    case Ex.Frontegg:
      return <FronteggAuth>{children}</FronteggAuth>;
    case Ex.CustomAuthWrapper:
      return <CustomAuthWrapper>{children}</CustomAuthWrapper>;
    case Ex.CustomAuthComponents:
      return <CustomAuthComponents>{children}</CustomAuthComponents>;
    // case Ex.OnlyAuthAPI:
    //   return <OnlyAuthAPI />;
  }

  return <>{children}</>;
};
