import React, { FC, useMemo } from 'react';
import { FFormik, FSelect, SelectOptionProps, useSelector } from '@frontegg/react-core';
import { IPluginState } from '../interfaces';

export interface ISelectSlack {
  name: string;
}

export const SelectSlack: FC<ISelectSlack> = ({ name }) => {
  const { slackChannels } = useSelector(
    ({
      integrations: {
        slackChannels: { data: slackChannels },
      },
    }: IPluginState) => ({
      slackChannels,
    })
  );
  const {} = FFormik.useFormikContext();

  const slackOptions: SelectOptionProps<string>[] = useMemo(
    () => (slackChannels || [])?.map(({ name, id }) => ({ label: name, value: id })),
    [slackChannels]
  );

  return <FSelect name={name} multiselect options={slackOptions} />;
};
