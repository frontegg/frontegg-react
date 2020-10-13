import React, { FC } from 'react';
import { Elements, fronteggElements } from '@frontegg/react-core';
import { uiLibrary as S } from '@frontegg/react-elements-semantic';
import { uiLibrary as M } from '@frontegg/react-elements-material-ui';

const SE = S as Elements;
const FE = fronteggElements as Elements;
const ME = M as Elements;

const positions = [
  {
    vertical: 'top',
    horizontal: 'left',
  },
  {
    vertical: 'top',
    horizontal: 'center',
  },
  {
    vertical: 'top',
    horizontal: 'right',
  },
  {
    vertical: 'center',
    horizontal: 'right',
  },
  {
    vertical: 'bottom',
    horizontal: 'right',
  },
  {
    vertical: 'bottom',
    horizontal: 'center',
  },
  {
    vertical: 'bottom',
    horizontal: 'left',
  },
  {
    vertical: 'center',
    horizontal: 'left',
  },
];
export const PopupExample: FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <h2>Hover Popup Example</h2>
      <h4>Frontegg Popup</h4>
      <div>
        {positions.map((position: any) => (
          <FE.Popup
            position={position}
            action='hover'
            content={<div>Hover</div>}
            trigger={
              <FE.Button className={'fe-mr-1'}>
                Trigger {position.vertical} {position.horizontal}
              </FE.Button>
            }
          />
        ))}
      </div>
      <h4>Semantic Popup</h4>
      <div>
        {positions.map((position: any) => (
          <SE.Popup
            position={position}
            action='hover'
            content={<div>Hover</div>}
            trigger={
              <SE.Button className={'fe-mr-1'}>
                Trigger {position.vertical} {position.horizontal}
              </SE.Button>
            }
          />
        ))}
      </div>
      <h4>Material Popup</h4>
      <div>
        {positions.map((position: any) => (
          <ME.Popup
            position={position}
            action='hover'
            content={<div>Hover</div>}
            trigger={
              <ME.Button className={'fe-mr-1'}>
                Trigger {position.vertical} {position.horizontal}
              </ME.Button>
            }
          />
        ))}
      </div>

      <br />
      <br />
      <h2>Click Popup Example</h2>
      <h4>Frontegg Popup</h4>
      <div>
        {positions.map((position: any) => (
          <FE.Popup
            position={position}
            action='click'
            content={<div>Hover</div>}
            trigger={
              <FE.Button className={'fe-mr-1'}>
                Trigger {position.vertical} {position.horizontal}
              </FE.Button>
            }
          />
        ))}
      </div>
      <h4>Semantic Popup</h4>
      <div>
        {positions.map((position: any) => (
          <SE.Popup
            position={position}
            action='click'
            content={<div>Hover</div>}
            trigger={
              <SE.Button className={'fe-mr-1'}>
                Trigger {position.vertical} {position.horizontal}
              </SE.Button>
            }
          />
        ))}
      </div>
      <h4>Material Popup</h4>
      <div>
        {positions.map((position: any) => (
          <ME.Popup
            position={position}
            action='click'
            content={<div>Hover</div>}
            trigger={
              <ME.Button className={'fe-mr-1'}>
                Trigger {position.vertical} {position.horizontal}
              </ME.Button>
            }
          />
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
