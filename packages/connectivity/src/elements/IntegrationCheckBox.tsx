import React, { FC, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import { FFormik } from '@frontegg/react-core';
import { CheckSvg } from './Svgs';

export interface IIntegrationCheckBox {
  name: string;
}

export const FIntegrationCheckBox: FC<IIntegrationCheckBox> = ({ name }) => {
  const [{ value, ...inputProps }, {}, { setValue }] = FFormik.useField(name);

  return <IntegrationCheckBox {...inputProps} name={name} checked={!!value} onChange={(e) => setValue(!value)} />;
};

export const IntegrationCheckBox: FC<Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'size'>> = ({
  checked,
  onChange,
  ...inputProps
}) => (
  <label className={classnames('fe-integration-checkbox', { active: !!checked })}>
    <CheckSvg
      className={classnames(`fe-connectivity-platform-check`, { [`fe-connectivity-platform-check-active`]: !!checked })}
    />
    <input {...inputProps} type='checkbox' checked={checked} onChange={onChange} />
  </label>
);
