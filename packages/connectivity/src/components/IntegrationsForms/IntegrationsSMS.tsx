import React, { FC } from 'react';
import { IIntegrationsComponent } from '../../interfaces';
import { IntegrationsForm } from './IntegrationsForm';

export const IntegrationsSMS: FC<IIntegrationsComponent> = () => <IntegrationsForm form='sms' />;
