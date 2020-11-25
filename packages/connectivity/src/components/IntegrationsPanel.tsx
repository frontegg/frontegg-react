import { Button, useT } from '@frontegg/react-core';
import React, {  FC, useRef } from 'react';
import { IConnectivityComponent } from '../interfaces';

export interface IConnectivityPanel extends IConnectivityComponent {
  show: boolean;
}

export const ConnectivityPanel: FC<IConnectivityPanel> = ({ children, show, onClose }) => {
  const { t } = useT();
  const divRef = useRef<HTMLDivElement>(null);

  return show ? (
    <div className='fe-connectivity-panel' ref={divRef}>
      <div>
        <Button className='fe-connectivity-panel-btn' transparent onClick={() => onClose && onClose()} fullWidth>
          <div className='fe-connectivity-panel-close'>
            <span className='fe-connectivity-panel-close-icon fe-mr-3'>&#10005;</span>
            {t('common.events')}
          </div>
        </Button>
      </div>
      {children}
    </div>
  ) : null;
};
