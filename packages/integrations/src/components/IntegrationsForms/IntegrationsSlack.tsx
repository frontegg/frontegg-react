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

  const tablesData: ITableData[] | null = useMemo(
    () =>
      cleanCategory && slackSubscriptions
        ? cleanCategory.map(({ id, name, events }) => ({
            id,
            name,
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
          }))
        : null,
    [cleanCategory, slackSubscriptions]
  );

  const columns = useMemo(
    () =>
      (tablesData || []).map(
        ({ name }, idx) =>
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
              Cell: ({ row: { index } }) => <FIntegrationCheckBox name={`data[${idx}].events[${index}].isActive`} />,
              maxWidth: 30,
            },
            {
              accessor: 'slackEvents',
              Header: t('common.channels').toUpperCase(),
              Cell: ({
                row: {
                  index,
                  original: { isActive },
                },
              }) => (
                <SelectSlack disabled={!isActive} name={`data[${idx}].events[[${index}].slackEvents[0].channelIds`} />
              ),
            },
            {
              accessor: 'non',
              Header: t('common.message').toUpperCase(),
              Cell: ({
                row: {
                  index,
                  original: { isActive },
                },
              }) => <FInput disabled={!isActive} name={`data[${idx}].events[${index}].slackEvents[0].message`} />,
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
        {(tablesData || []).map(({ id, events }, idx) => (
          <Table
            rowKey='eventId'
            key={id}
            columns={columns[idx]}
            data={events || []}
            totalData={events?.length || 0}
            className={classnames('fe-integrations-table-accordion', { 'fe-integrations-open': opens.includes(idx) })}
          />
        ))}
      </FFormik.Form>
    </FFormik.Formik>
  );
};
