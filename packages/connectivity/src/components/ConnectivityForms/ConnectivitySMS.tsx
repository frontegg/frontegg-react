import React, { FC } from 'react';
import { IConnectivityComponent } from '../../interfaces';
import { ConnectivityForm } from './ConnectivityForm';

export const ConnectivitySMS: FC<IConnectivityComponent> = () => <ConnectivityForm form='sms' />;
