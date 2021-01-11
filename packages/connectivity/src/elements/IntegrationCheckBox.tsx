import React, { FC, InputHTMLAttributes } from 'react';
import { FFormik, SwitchToggle, SwitchToggleProps } from '@frontegg/react-core';

export interface IIntegrationCheckBox {
  name: string;
}

export const FIntegrationCheckBox: FC<IIntegrationCheckBox> = ({ name }) => {
  const [{ value, ...inputProps }, {}, { setValue }] = FFormik.useField(name);

  return <IntegrationCheckBox {...inputProps} name={name} value={!!value} onChange={(e) => setValue(!value)} />;
};

export const IntegrationCheckBox: FC<SwitchToggleProps> = (props) => <SwitchToggle {...props} />;
