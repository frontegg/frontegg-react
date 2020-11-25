import { FFormik, FInput } from '@frontegg/react-core';
import React, { FC } from 'react';
import { ISlackTableData } from '../interfaces';

export interface IMessageSlack {
  eventIdx: number;
  dataIdx: number;
}

export const MessageSlack: FC<IMessageSlack> = ({ eventIdx, dataIdx }) => {
  const { values } = FFormik.useFormikContext<{ data: ISlackTableData[] }>();

  const { isActive } = values.data[dataIdx].events[eventIdx];

  return <FInput disabled={!isActive} name={`data[${dataIdx}].events[${eventIdx}].slackEvents[0].message`} />;
};
