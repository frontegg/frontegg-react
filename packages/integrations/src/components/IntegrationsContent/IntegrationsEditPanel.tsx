import React, { FC } from 'react';
import { useT } from '@frontegg/react-core';

export interface IIntegrationsEditPanel {
  onClose(): void;
}

export const IntegrationsEditPanel: FC<IIntegrationsEditPanel> = ({ onClose, children }) => {
  const { t } = useT();

  return (
    <div className='fe-integrations-edit'>
      <button className='fe-integrations-edit-close fe-integrations-button-link' onClick={onClose}>
        <span className='fe-integrations-edit-close-icon'>&#10005;</span> {t('integrations.events')}
      </button>
      <div className='fe-integrations-edit-form'>{children}</div>
    </div>
  );
};
