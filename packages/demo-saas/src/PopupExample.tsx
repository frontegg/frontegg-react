import React, { FC, useRef } from 'react';
import { Elements, fronteggElements } from '@frontegg/react-core';
import { uiLibrary as S } from '@frontegg/react-elements-semantic';
import { uiLibrary as M } from '@frontegg/react-elements-material-ui';

const SE = S as Elements;
const FE = fronteggElements as Elements;
const ME = M as Elements;
export const PopupExample: FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Popup Example</h2>
      <h4>Frontegg Popup</h4>
      <div>
        <FE.Popup position='bc' action='hover' content={<span>My content</span>} trigger={<div> my triggerr</div>} />
      </div>
      <h4>Semantic Popup</h4>
      <div>
        <SE.Popup position='bl' action='hover' content={<div>My content</div>} trigger={<span> my trigger</span>} />
      </div>
      <h4>Material Popup</h4>
      <div>
        <ME.Popup position='bl' action='hover' content={<span>my content</span>} trigger={<span> my trigger</span>} />
      </div>
    </div>
  );
};
