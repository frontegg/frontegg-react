import React, { FC, useCallback, useMemo, useState } from 'react';
import { Grid, Icon, FFormik, Checkbox, Accordion, AccordionHeader, AccordionContent } from '@frontegg/react-core';
import { selectedEvents } from '../utils';
import { ICategory } from '@frontegg/rest-api';
import { IWebhookComponent } from '../components/IntegrationsWebhooks/interfaces';

export const AccordingCategories: FC<IWebhookComponent> = ({ cleanCategory }) => {
  const [{ value }, {}, { setValue }] = FFormik.useField<string[]>('eventKeys');
  const [expanded, setExpanded] = useState<string[]>([]);

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

  const onCategoryChange = useCallback(
    (category: ICategory) => {
      const template = `${category.name}.*`;
      if (eventObject?.names.includes(category.name)) {
        setValue(value.filter((el) => el !== template));
      } else {
        setValue([...value, template]);
      }
    },
    [eventObject, value]
  );

  const onEventChange = useCallback(
    (parent: ICategory, key: string) => {
      const template = `${parent.name}.*`;
      if (eventObject?.names.includes(parent.name)) {
        setValue([
          ...value.filter((el) => el !== template),
          ...(parent.events?.filter((el) => el.key !== key).map(({ key }) => key) ?? []),
        ]);
      } else if (eventObject?.eventKeys.includes(key)) {
        setValue(value.filter((el) => el !== key));
      } else if (
        parent.events?.filter((el) => eventObject?.eventKeys.includes(el.key) || el.key === key).length ===
          parent.events?.length &&
        !eventObject?.eventKeys.includes(key)
      ) {
        setValue([...value.filter((el) => !parent.events?.some((p) => p.key === el)), template]);
      } else {
        setValue([...value, key]);
      }
    },
    [eventObject, value]
  );

  const onExpand = useCallback(
    (id: string) => {
      setExpanded(expanded.includes(id) ? expanded.filter((el) => el !== id) : [...expanded, id]);
    },
    [expanded]
  );

  return (
    <div>
      {extendCategory?.map((category) => {
        const { id, name, events, selected } = category;
        return (
          <Accordion key={id} expanded={expanded.includes(id)} onChange={() => onExpand(id)}>
            <AccordionHeader>
              <Grid container alignItems='center' wrap='nowrap'>
                <Grid>
                  <Icon name={expanded.includes(id) ? 'down-arrow' : 'right-arrow'} />
                </Grid>
                <Grid className='fe-integrations-webhook-according-events-name'>{name}</Grid>
                <Grid>Selected: {selected}</Grid>
              </Grid>
            </AccordionHeader>
            <AccordionContent>
              <div>
                <Checkbox
                  checked={eventObject?.names.includes(name)}
                  className='fe-integrations-webhook-check-all'
                  onChange={() => onCategoryChange(category)}
                  label={`SELECT ALL IN THE ${name.toUpperCase()} CATEGORY`}
                />
              </div>
              {events?.map(({ id, displayName, key }) => (
                <div key={id}>
                  <Checkbox
                    className='fe-integrations-webhook-check-item'
                    label={displayName}
                    size='large'
                    onChange={() => onEventChange(category, key)}
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
