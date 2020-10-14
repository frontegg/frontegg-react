import React, { FC } from 'react';
import { uiLibrary as Semantic } from '@frontegg/react-elements-semantic';
import { uiLibrary as Material } from '@frontegg/react-elements-material-ui';
import { Elements, fronteggElements as Frontegg } from '@frontegg/react-core';

const FE = Frontegg as Elements;

export const CheckboxPage: FC = () => {
  return (
    <div>
      <FE.Checkbox />
      <FE.Checkbox label={'My Checkbox Label'} />
    </div>
  );
};
