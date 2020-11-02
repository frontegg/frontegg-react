import React, { FC, useEffect, useMemo, useState } from 'react';
import { FSelect, SelectOptionProps, SelectProps, useDebounce, useSelector } from '@frontegg/react-core';
import { IPluginState } from '../interfaces';

export interface ISelectSlack extends Pick<SelectProps, 'value'> {
  // onChange(newValues: string[]): void;
  name: string;
}

export const SelectSlack: FC<ISelectSlack> = ({ value }) => {
  const { slackChannels } = useSelector(
    ({
      integrations: {
        slackChannels: { data: slackChannels },
        categories,
        channelMap,
        slack,
      },
    }: IPluginState) => ({
      slackChannels,
    })
  );
  // const [values, setValues] = useState(value);

  // const changesValue = useDebounce(values, 500);

  // useEffect(() => {
  //   JSON.stringify(changesValue) !== JSON.stringify(value) && onChange(changesValue || []);
  // }, [changesValue]);

  const slackOptions: SelectOptionProps<string>[] = useMemo(
    () => (slackChannels || [])?.map(({ name, id }) => ({ label: name, value: id })),
    [slackChannels]
  );

  return (
    <FSelect
      name={name}
      multiselect
      // value={values}
      options={slackOptions}
      // onChange={(_, newValue) => setValues(newValue)}
    />
  );
};
