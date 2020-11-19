import React, { FC } from 'react';
import { IIntegrationsComponent } from '../../interfaces';
import { IntegrationsForm } from './IntegrationsForm';

export const IntegratorsEmail: FC<IIntegrationsComponent> = () => <IntegrationsForm form='email' />;
