import React, { FC, useCallback, useMemo } from 'react';
import { FFormik, Select, SelectOptionProps } from '@frontegg/react-core';
import { IWebhookComponent } from '../components/ConnectivityWebhooks/interfaces';

export const SelectWebhook: FC<IWebhookComponent> = ({ cleanCategory }) => {
  const [{ value: formikValue }, {}, { setValue }] = FFormik.useField<string[]>('eventKeys');

  const options = useMemo(
    () =>
      cleanCategory?.reduce((acc: SelectOptionProps<string>[], cur) => {
        const template = `${cur.name}.*`;
        if (formikValue.includes(template)) {
          return [...acc, { value: template, label: template }];
        }
        return [
          ...acc,
          { value: template, label: template },
          ...(cur.events?.map(({ key, displayName }) => ({ value: key, label: displayName })) ?? []),
        ];
      }, []) ?? [],
    [cleanCategory, formikValue]
  );

  const objectValue = useMemo(() => options.filter(({ value }) => formikValue.includes(value)), [options, formikValue]);

  const onChange = useCallback(
    (e: Event, newValue: SelectOptionProps<string>[]) => {
      const values = newValue.map(({ value }) => value);
      const cleanValue = cleanCategory?.reduce((acc: string[], cur) => {
        const template = `${cur.name}.*`;
        if (values.includes(template)) {
          return [...acc, template];
        }
        const selectedEvents = cur.events?.filter(({ key }) => values.includes(key)).map(({ key }) => key);
        if (selectedEvents && selectedEvents.length !== 0) {
          return [...acc, ...selectedEvents];
        }
        return acc;
      }, []);
      setValue(cleanValue ?? []);
    },
    [setValue, cleanCategory]
  );

  return <Select options={options} value={objectValue} multiselect onChange={onChange} />;
};
