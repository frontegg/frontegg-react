import React, { FC, useMemo } from 'react';
import { FFormik, Select, SelectOptionProps, useSelector } from '@frontegg/react-core';
import { IPluginState, ISlackTableData } from '../interfaces';
export interface ISelectSlack {
  eventIdx: number;
  dataIdx: number;
}

export const SelectSlack: FC<ISelectSlack> = ({ eventIdx, dataIdx }) => {
  const [{ value, ...inputProps }, {}, { setValue }] = FFormik.useField(
    `data[${dataIdx}].events[[${eventIdx}].slackEvents[0].channelIds`
  );
  const { values, isSubmitting } = FFormik.useFormikContext<{ data: ISlackTableData[] }>();
  const { slackChannels } = useSelector(
    ({
      connectivity: {
        slackChannels: { data: slackChannels },
      },
    }: IPluginState) => ({
      slackChannels,
    })
  );

  const { isActive } = values.data[dataIdx].events[eventIdx];

  const slackOptions: SelectOptionProps<string>[] = useMemo(
    () => (slackChannels || [])?.map(({ name, id }) => ({ label: name, value: id })),
    [slackChannels]
  );

  return (
    <Select
      multiselect
      {...inputProps}
      options={slackOptions}
      disabled={isSubmitting || !isActive}
      value={value?.map((elm: string) => slackOptions.find(({ value }) => value === elm))}
      onChange={(e, newValue) => setValue(newValue.map(({ value }) => value))}
    />
  );
};
