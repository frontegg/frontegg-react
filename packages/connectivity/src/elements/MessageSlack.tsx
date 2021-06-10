import { FFormik, FInput } from '@frontegg/react-core';
import React, { FC } from 'react';
import { IFormikEditComponent, ISlackTableData } from '../interfaces';

export const MessageSlack: FC<IFormikEditComponent> = ({ eventIdx, dataIdx }) => {
  return (
    <FInput
      dontDisableSaving
      fullWidth
      name={`data[${dataIdx}].events[${eventIdx}].slackEvents[0].message`}
      className='fe-connectivity-table-input'
    />
  );
};
