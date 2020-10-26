import { IEmailConfigurations, ISlackSubscription, ISMSConfigurations } from '@frontegg/react-core';
import { FC } from 'react';

export type TForms = 'slack' | 'email' | 'sms';

export type TFormsData =
  | Omit<ISlackSubscription, 'id'>
  | Omit<IEmailConfigurations, 'id'>
  | Omit<ISMSConfigurations, 'id'>;
export interface IPluginState {
  integrations: IIntegrationsState;
}
export interface IIntegrationsState {
  isLoading: boolean;
  forms: {
    isLoading: boolean;
    data?: IIntegrationsSlack;
    savedSuccess: boolean;
  };
}

export interface IIntegrationsData {
  id: string;
  platform: string;
  active: boolean;
  events: number;
  Form: FC<IFormComponents>;
}

export interface IIntegrationsSlack {
  id: string;
}

export interface IFormComponents {
  onClose(): void;
}
