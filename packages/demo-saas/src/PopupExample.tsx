import React, { FC } from 'react';
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
        <FE.Popup
          position='lc'
          action='click'
          content={<div>My content</div>}
          trigger={<FE.Button>Trigger</FE.Button>}
        />
      </div>
      <h4>Semantic Popup</h4>
      <div>
        <SE.Popup
          position='rc'
          action='focus'
          content={<div>My content</div>}
          trigger={<SE.Button>Trigger</SE.Button>}
        />
      </div>
      <h4>Material Popup</h4>
      <div>
        <ME.Popup
          position='bc'
          action='hover'
          content={<div>My content</div>}
          trigger={<ME.Button>Trigger</ME.Button>}
        />
      </div>
    </div>
  );
};
