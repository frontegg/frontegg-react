import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import {
  useT,
  Icon,
  Table,
  FInput,
  Loader,
  Button,
  FFormik,
  useDispatch,
  useSelector,
  FormikAutoSave,
  TableColumnProps,
  useSearch,
  NotFound,
} from '@frontegg/react-core';
import { ISlackConfigurations, ISlackEvent, ISlackSubscription } from '@frontegg/rest-api';
import { IIntegrationsComponent, IPluginState } from '../../interfaces';
import { integrationsActions } from '../../reducer';
import { filterCategories } from '../../utils';
import { SelectSlack } from '../../elements/SelectSlack';
import { FIntegrationCheckBox } from '../../elements/IntegrationCheckBox';
import { IntegrationsSlackAuth } from './IntegrationsSlackAuth';

interface ITableData {
  id: string;
  name: string;
  index: number;
  events: IEventData[];
}
interface IEventData {
  eventId: string;
  id?: string;
  isActive: boolean;
  slackEvents?: Partial<ISlackEvent>[];
  displayName: string;
}

export const IntegrationsSlack: FC<IIntegrationsComponent> = () => {
  const { t } = useT();
  const dispatch = useDispatch();
  const [opens, setOpens] = useState<number[]>([]);

  const { isLoading, categories, channelMap, slack, isSaving, slackChannels } = useSelector(
    ({
      integrations: {
        slack,
        isSaving,
        categories,
        channelMap,
        slackChannels: { isLoading, clientId, data: slackChannels },
      },
    }: IPluginState) => ({
      slack,
      clientId,
      isSaving,
      isLoading,
      categories,
      slackChannels,
      channelMap: channelMap?.slack,
    })
  );

  const cleanCategory = filterCategories(categories, channelMap);

  const { slackSubscriptions } = slack ?? { slackSubscriptions: null };

  const tablesData: ITableData[] | undefined = useMemo(
    () =>
      (cleanCategory &&
        slackSubscriptions &&
        cleanCategory.map(({ id, name, events, index }) => ({
          id,
          name,
          index,
          events: (events || []).map(({ id: eventId, displayName, key }) => ({
            displayName,
            isActive: false,
            slackEvents: [
              {
                eventKey: key,
              },
            ],
            ...slackSubscriptions.find(({ slackEvents }) =>
              (slackEvents || []).some(({ eventKey }) => eventKey === key)
            ),
            eventId,
          })),
        }))) ||
      undefined,
    [cleanCategory, slackSubscriptions]
  );

  const columns = useMemo(
    () =>
      (tablesData || []).map(
        ({ name, index }, idx) =>
          [
            {
              accessor: 'displayName',
              Header: () => (
                <Button
                  transparent
                  iconButton
                  className='fe-integrations-accordion-button'
                  onClick={() => {
                    setOpens(opens.includes(idx) ? opens.filter((e) => e !== idx) : [...opens, idx]);
                  }}
                >
                  <Icon name={opens.includes(idx) ? 'down-arrow' : 'right-arrow'} />
                  {name}
                </Button>
              ),
            },
            {
              accessor: 'isActive',
              Header: t('common.enabled').toUpperCase(),
              Cell: ({ row: { index: rowIndex } }) => (
                <FIntegrationCheckBox name={`data[${index}].events[${rowIndex}].isActive`} />
              ),
              maxWidth: 30,
            },
            {
              accessor: 'slackEvents',
              Header: t('common.channels').toUpperCase(),
              Cell: ({
                row: {
                  index: rowIndex,
                  original: { isActive },
                },
              }) => (
                <SelectSlack
                  disabled={!isActive}
                  name={`data[${index}].events[[${rowIndex}].slackEvents[0].channelIds`}
                />
              ),
            },
            {
              accessor: 'non',
              Header: t('common.message').toUpperCase(),
              Cell: ({
                row: {
                  index: rowIndex,
                  original: { isActive },
                },
              }) => <FInput disabled={!isActive} name={`data[${index}].events[${rowIndex}].slackEvents[0].message`} />,
            },
          ] as TableColumnProps<IEventData>[]
      ),
    [tablesData, t, opens]
  );

  useEffect(() => {
    dispatch(integrationsActions.loadSlackActions());
    return () => {
      dispatch(integrationsActions.cleanSlackData());
    };
  }, [dispatch]);

  const [filterTableData, Search] = useSearch({
    data: tablesData,
    filteredBy: 'name',
    filterFunction: (allData: ITableData[], regexp, isEmpty) => {
      const result = isEmpty
        ? allData
        : (allData
            .map(({ name, events, ...cat }) => {
              const eventsFiltered = events?.filter(({ displayName }) => regexp.test(displayName)) ?? [];
              return regexp.test(name) || eventsFiltered.length
                ? { ...cat, name, events: regexp.test(name) ? events : eventsFiltered }
                : null;
            })
            .filter((e) => !!e) as ITableData[]);
      setOpens(
        isEmpty
          ? []
          : Array(result.length)
              .fill('')
              .map((_, idx) => idx)
      );
      return result;
    },
  });

  const saveData = useCallback(
    (data?: ITableData[]) => {
      if (!slack || !data) return;
      const { id } = slack;
      const newData: ISlackConfigurations = {
        id,
        // @ts-ignore
        slackSubscriptions: data.reduce((acc: ISlackSubscription[], curr: ITableData) => {
          const { events = [] } = curr;
          return [
            ...acc,
            ...events.map(({ isActive, id, slackEvents }) => ({
              id,
              isActive,
              slackEvents,
            })),
          ];
        }, []),
      };

      dispatch(integrationsActions.postDataAction('slack', newData));
    },
    [dispatch, slack]
  );

  if (isLoading) {
    return <Loader center />;
  }

  if (!isLoading && !slackChannels?.length) {
    return <IntegrationsSlackAuth />;
  }

  if (!tablesData?.length) {
    return <> Required configure the connectivity</>;
  }

  return (
    <FFormik.Formik enableReinitialize initialValues={{ data: tablesData }} onSubmit={(val) => saveData(val.data)}>
      <FFormik.Form>
        <FormikAutoSave isSaving={isSaving} />
        {Search}
        {filterTableData.length ? (
          filterTableData.map(({ id, events, index }, idx) => (
            <Table
              rowKey='eventId'
              key={id}
              columns={columns[index]}
              data={events || []}
              totalData={events?.length || 0}
              className={classnames('fe-integrations-table-accordion', { 'fe-integrations-open': opens.includes(idx) })}
            />
          ))
        ) : (
          <NotFound />
        )}
      </FFormik.Form>
    </FFormik.Formik>
  );
};
