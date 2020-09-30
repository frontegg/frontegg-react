import React, { FC } from 'react';
import { Elements, fronteggElements } from '@frontegg/react-core';
import { uiLibrary as S } from '@frontegg/react-elements-semantic';
import { uiLibrary as M } from '@frontegg/react-elements-material-ui';

const SE = S as Elements;
const FE = fronteggElements as Elements;
export const PopupExample: FC = () => {
  return (
    <div>
      <h2>Popup Example</h2>

      <h4>Frontegg Popup</h4>
      <div>
        <FE.Popup action='hover' content={<div>my content</div>} trigger={<div> my trigger</div>} />
      </div>

      <h4>Semantic Popup</h4>
      <div>
        <SE.Popup action='hover' content={<div>my content</div>} trigger={<div> my trigger</div>} />
      </div>
    </div>
  );
};
