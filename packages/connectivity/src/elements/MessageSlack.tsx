import { FFormik, FInput } from '@frontegg/react-core';
import React, { FC } from 'react';
import { IFormikEditComponent, ISlackTableData } from '../interfaces';

export const MessageSlack: FC<IFormikEditComponent> = ({ eventIdx, dataIdx }) => {
  const { values } = FFormik.useFormikContext<{ data: ISlackTableData[] }>();

  const { isActive } = values.data[dataIdx].events[eventIdx];

  return (
    <FInput
      dontDisableSaving
      disabled={!isActive}
      fullWidth
      name={`data[${dataIdx}].events[${eventIdx}].slackEvents[0].message`}
      className='fe-connectivity-table-input'
    />
  );
};
