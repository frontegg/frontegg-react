import React, { FC } from 'react';
import { IConnectivityComponent } from '../../interfaces';
import { ConnectivityForm } from './ConnectivityForm';

export const IntegratorsEmail: FC<IConnectivityComponent> = () => <ConnectivityForm form='email' />;
