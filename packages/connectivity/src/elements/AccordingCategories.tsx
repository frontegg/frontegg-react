import React, { FC, useCallback, useMemo, ChangeEvent } from 'react';
import {
  Grid,
  Icon,
  useT,
  FFormik,
  Checkbox,
  Accordion,
  AccordionHeader,
  AccordionContent,
} from '@frontegg/react-core';
import { selectedEvents } from '../utils';
import { IWebhookComponent } from '../components/ConnectivityWebhooks/interfaces';

export const AccordingCategories: FC<IWebhookComponent> = ({ cleanCategory }) => {
  const { t } = useT();
  const [{ value }, {}, { setValue }] = FFormik.useField<string[]>('eventKeys');

  const eventObject = selectedEvents(value);

  const extendCategory = useMemo(
    () =>
      cleanCategory?.map(({ name, events, ...props }) => ({
        ...props,
        events,
        name,
        selected: eventObject?.names.includes(name)
          ? events?.length ?? 0
          : events?.filter(({ key }) => eventObject?.eventKeys.includes(key)).length,
      })),
    [cleanCategory, eventObject]
  );

  const handleCategoryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const category = extendCategory?.find(({ id }) => id === e.target.dataset.category);
      if (!category) return;

      const template = `${category.name}.*`;
      if (eventObject?.names.includes(category.name)) {
        setValue([
          ...value.filter((el) => el !== template),
          ...(category.events?.filter(({ key }) => !value.includes(key)).map(({ key }) => key) ?? []),
        ]);
      } else {
        const keys = category.events?.map(({ key }) => key) ?? [];
        setValue([...value.filter((key) => !keys.includes(key)), template]);
      }
    },
    [extendCategory, eventObject, value]
  );

  const handleEventChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const parent = extendCategory?.find(({ id }) => id === e.target.dataset.category);
      const key = e.target.dataset.key;
      if (!parent || !key) return;

      const template = `${parent.name}.*`;
      if (eventObject?.names.includes(parent.name)) {
        setValue([
          ...value.filter((el) => el !== template),
          ...(parent.events?.filter((el) => el.key !== key).map(({ key }) => key) ?? []),
        ]);
      } else if (eventObject?.eventKeys.includes(key)) {
        setValue(value.filter((el) => el !== key));
      } else {
        setValue([...value, key]);
      }
    },
    [extendCategory, eventObject, value]
  );

  return (
    <div>
      {extendCategory?.map((category) => {
        const { id, name, events, selected } = category;
        return (
          <Accordion key={id} className='fe-connectivity-webhook-accordion'>
            <AccordionHeader>
              <Grid container alignItems='center' wrap='nowrap'>
                <Icon name='right-arrow' className='fe-connectivity-webhook-accordion-icon' />
                <Grid className='fe-connectivity-webhook-according-events-name'>{name}</Grid>
                <Grid>
                  {t('common.selected')}: {selected}
                </Grid>
              </Grid>
            </AccordionHeader>
            <AccordionContent>
              <div>
                <Checkbox
                  checked={eventObject?.names.includes(name)}
                  className='fe-connectivity-webhook-check fe-check-all'
                  onChange={handleCategoryChange}
                  data-category={id}
                  label={t('connectivity.selectAll', { name: name.toUpperCase() })}
                />
              </div>
              {events?.map(({ id, displayName, key }) => (
                <div key={id}>
                  <Checkbox
                    className='fe-connectivity-webhook-check fe-check-item'
                    label={displayName}
                    size='large'
                    onChange={handleEventChange}
                    data-category={category.id}
                    data-key={key}
                    checked={eventObject?.names.includes(name) || eventObject?.eventKeys.includes(key)}
                  />
                </div>
              ))}
            </AccordionContent>
          </Accordion>
        );
      })}
    </div>
  );
};
