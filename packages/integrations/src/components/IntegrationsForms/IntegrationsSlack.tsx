import React, { FC, useCallback, useEffect, useMemo } from 'react';
import {
  useT,
  Table,
  FInput,
  Loader,
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
  events: {
    eventId: string;
    id?: string;
    isActive: boolean;
    slackEvents?: Partial<ISlackEvent>[];
    displayName: string;
  }[];
}

export const IntegrationsSlack: FC<IIntegrationsComponent> = () => {
  const { t } = useT();
  const dispatch = useDispatch();
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
              Header: name,
            },
            {
              accessor: 'isActive',
              Header: t('common.enabled').toUpperCase(),
              Cell: ({ row: { index } }) => <FIntegrationCheckBox name={`data[${idx}].events[${index}].isActive`} />,
            },
            {
              accessor: 'slackEvents',
              Header: t('common.channels').toUpperCase(),
              Cell: ({ row: { index } }) => (
                <SelectSlack name={`data[${idx}].events[[${index}].slackEvents[0].channelIds`} />
              ),
            },
            {
              accessor: 'non',
              Header: t('common.message').toUpperCase(),
              Cell: ({ row: { index } }) => <FInput name={`data[${idx}].events[${index}].slackEvents[0].message`} />,
            },
          ] as TableColumnProps<{}>[]
      ),
    [tablesData, t]
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
          <Table rowKey='eventId' key={id} columns={columns[idx]} data={events || []} totalData={events?.length || 0} />
        ))}
      </FFormik.Form>
    </FFormik.Formik>
  );
};
