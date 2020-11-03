import { FFormik } from '@frontegg/react-core';
import classnames from 'classnames';
import React, { FC } from 'react';

export interface IIntegrationCheckBox {
  name: string;
}

export const IntegrationCheckBox: FC<IIntegrationCheckBox> = ({ name }) => {
  const [{ value, ...inputProps }, {}, { setValue }] = FFormik.useField(name);

  return (
    <label className={classnames('fe-integration-checkbox', { active: !!value })}>
      <input {...inputProps} type='checkbox' checked={value} onChange={(e) => setValue(!value)} />
    </label>
  );
};
