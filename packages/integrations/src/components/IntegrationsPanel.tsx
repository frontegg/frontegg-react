import { Button, Grid, useT } from '@frontegg/react-core';
import React, { CSSProperties, FC, useCallback, useEffect, useRef, useState } from 'react';
import { IIntegrationsComponent } from '../interfaces';

export interface IIntegrationsPanel extends IIntegrationsComponent {
  show: boolean;
}

export const IntegrationsPanel: FC<IIntegrationsPanel> = ({ children, show, onClose }) => {
  const { t } = useT();
  const divRef = useRef<HTMLDivElement>(null);

  return show ? (
    <div className='fe-integrations-panel' ref={divRef}>
      <div>
        <Button className='fe-integrations-panel-btn' transparent onClick={() => onClose && onClose()} fullWidth>
          <div className='fe-integrations-panel-close'>
            <span className='fe-integrations-panel-close-icon fe-mr-3'>&#10005;</span>
            {t('common.events')}
          </div>
        </Button>
      </div>
      {children}
    </div>
  ) : null;
};
