import React, { FC } from 'react';
import { FFormik, SwitchToggle, SwitchToggleProps } from '@frontegg/react-core';

export interface IConnectivityCheckBox {
  name: string;
}

export const FConnectivityCheckBox: FC<IConnectivityCheckBox> = ({ name }) => {
  const [{ value, ...inputProps }, {}, { setValue }] = FFormik.useField(name);

  return <ConnectivityCheckBox {...inputProps} name={name} value={!!value} onChange={(e) => setValue(!value)} />;
};

export const ConnectivityCheckBox: FC<SwitchToggleProps> = (props) => <SwitchToggle {...props} />;
