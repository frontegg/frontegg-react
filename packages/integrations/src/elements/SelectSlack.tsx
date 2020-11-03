import React, { FC, useMemo } from 'react';
import { FFormik, Select, SelectOptionProps, useSelector } from '@frontegg/react-core';
import { IPluginState } from '../interfaces';

export interface ISelectSlack {
  name: string;
}

export const SelectSlack: FC<ISelectSlack> = ({ name }) => {
  const [{ value, ...inputProps }, {}, { setValue }] = FFormik.useField(name);
  const { isSubmitting } = FFormik.useFormikContext();
  const { slackChannels } = useSelector(
    ({
      integrations: {
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
      disabled={isSubmitting}
      value={value?.map((elm: string) => slackOptions.find(({ value }) => value === elm))}
      onChange={(e, newValue) => setValue(newValue.map(({ value }) => value))}
    />
  );
};
