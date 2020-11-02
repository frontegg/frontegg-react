import { Button, Grid, useT } from '@frontegg/react-core';
import React, { CSSProperties, FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IIntegrationsComponent } from '../interfaces';

export interface IIntegrationsPanel extends IIntegrationsComponent {
  show: boolean;
}

export const IntegrationsPanel: FC<IIntegrationsPanel> = ({ children, show, onClose }) => {
  const { t } = useT();
  const divRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties | undefined>();

  // TODO need set here the resize event listener

  useEffect(() => {
    if (show && divRef.current) {
      const { top } = divRef.current.parentElement?.getBoundingClientRect() ?? { top: 0 };
      const { left, width } = document
        .getElementById('fe-integrations-firstColumn')
        ?.parentElement?.getBoundingClientRect() ?? {
        left: 0,
        width: 0,
      };
      setStyle({ ...style, top: top + window.scrollX, left: left + width + window.scrollY });
    }
  }, [divRef, setStyle, show]);

  return show ? (
    <div className='fe-integrations-panel' ref={divRef} style={style}>
      <div>
        <Button transparent onClick={onClose} fullWidth>
          <div className='fe-integrations-panel-close'>
            <span className='fe-integrations-panel-close-icon fe-mr-3'>&#10005;</span>
            {t('integrations.events')}
          </div>
        </Button>
      </div>
      {children}
    </div>
  ) : null;
};
