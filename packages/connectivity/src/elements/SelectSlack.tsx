import React, { FC, useMemo } from 'react';
import { FFormik, Select, SelectOptionProps, useSelector } from '@frontegg/react-core';
import { IFormikEditComponent, IPluginState, ISlackTableData } from '../interfaces';

export const SelectSlack: FC<IFormikEditComponent> = ({ eventIdx, dataIdx }) => {
  const [{ value, ...inputProps }, {}, { setValue }] = FFormik.useField(
    `data[${dataIdx}].events[[${eventIdx}].slackEvents[0].channelIds`
  );
  const { slackChannels } = useSelector(
    ({
      connectivity: {
        slackChannels: { data: slackChannels },
      },
    }: IPluginState) => ({
      slackChannels,
    })
  );

  const slackOptions: SelectOptionProps<string>[] = useMemo(
    () => (slackChannels || [])?.map(({ name, id }) => ({ label: name, value: id })),
    [slackChannels]
  );

  return (
    <Select
      multiselect
      {...inputProps}
      options={slackOptions}
      value={value?.map((elm: string) => slackOptions.find(({ value }) => value === elm))}
      onChange={(e, newValue) => setValue(newValue.map(({ value }) => value))}
    />
  );
};
