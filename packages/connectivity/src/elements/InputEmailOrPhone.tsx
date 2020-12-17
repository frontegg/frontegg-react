import { FFormik, FInputChip } from '@frontegg/react-core';
import React, { FC } from 'react';
import { IFormikEditComponent, ITableFormData } from '../interfaces';

export const InputEmailOrPhone: FC<IFormikEditComponent> = ({ eventIdx, dataIdx }) => {
  const { values } = FFormik.useFormikContext<{ data: ITableFormData[] }>();

  const { enabled } = values.data[dataIdx].events[eventIdx];

  return <FInputChip disabled={!enabled} name={`data[${dataIdx}].events[${eventIdx}].recipients`} fullWidth />;
};
