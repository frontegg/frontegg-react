import React, { FC } from 'react';
import { IConnectivityComponent } from '../../interfaces';
import { ConnectivityForm } from './ConnectivityForm';

export const ConnectivityEmail: FC<IConnectivityComponent> = () => <ConnectivityForm form='email' />;
