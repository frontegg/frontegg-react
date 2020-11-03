import React, { FC, useEffect, useMemo } from 'react';
import {
  FCheckbox,
  FFormik,
  FInput,
  Loader,
  Table,
  TableColumnProps,
  FormikAutoSave,
  useDispatch,
  useSelector,
  ISlackConfigurations,
  ISlackSubscription,
  ISlackEvent,
} from '@frontegg/react-core';
import { IIntegrationsComponent, IPluginState } from '../../interfaces';
import { integrationsActions } from '../../reducer';
import { filterCategories } from '../../utils';
import { SelectSlack } from '../../elements/SelectSlack';

interface ITableData {
  id: string;
  name: string;
  events: {
    eventId: string;
    id?: string;
    isActive: boolean;
    slackEvents?: ISlackEvent[];
    displayName: string;
  }[];
}

export const IntegrationsSlack: FC<IIntegrationsComponent> = () => {
  const dispatch = useDispatch();
  const { isLoading, categories, channelMap, slack, isSaving } = useSelector(
    ({
      integrations: {
        slackChannels: { isLoading },
        categories,
        channelMap,
        isSaving,
        slack,
      },
    }: IPluginState) => ({
      isLoading,
      categories,
      slack,
      isSaving,
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
              ...slackSubscriptions.find(({ slackEvents }) => slackEvents.some(({ eventKey }) => eventKey === key)),
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
              Header: 'ENABLED',
              Cell: ({ row: { index } }) => (
                <FCheckbox className='fe-integrations-checkbox' name={`data[${idx}].events[${index}].isActive`} />
              ),
            },
            {
              accessor: 'slackEvents',
              Header: 'CHANNELS',
              Cell: ({ row: { index } }) => (
                <SelectSlack name={`data[${idx}].events[[${index}].slackEvents[0].channelIds`} />
              ),
            },
            {
              accessor: 'non',
              Header: 'MESSAGE',
              Cell: ({ row: { index } }) => <FInput name={`data[${idx}].events[${index}].slackEvents[0].message`} />,
            },
          ] as TableColumnProps<{}>[]
      ),
    [tablesData]
  );

  useEffect(() => {
    dispatch(integrationsActions.loadSlackActions());
    return () => {
      dispatch(integrationsActions.cleanSlackData());
    };
  }, [dispatch]);

  const saveData = (data?: ITableData[]) => {
    if (!slack || !data) return;
    const { id } = slack;
    const newData: ISlackConfigurations = {
      id,
      // @ts-ignore
      slackSubscriptions: data.reduce((acc: ISlackSubscription[], curr: ITableData) => {
        const { events = [] } = curr;
        return [
          ...acc,
          ...events.map(({ isActive, slackEvents }) => ({
            isActive: Array.isArray(isActive) ? isActive.some((i) => i === 'on') : isActive,
            slackEvents,
          })),
        ];
      }, []),
    };

    dispatch(integrationsActions.postDataAction('slack', newData));
  };

  return isLoading ? (
    <Loader center />
  ) : tablesData ? (
    <FFormik.Formik initialValues={{ data: tablesData }} onSubmit={(val) => saveData(val.data)}>
      <FFormik.Form>
        <FormikAutoSave isSaving={isSaving} />
        {(tablesData || []).map(({ id, events }, idx) => (
          <Table rowKey='eventId' key={id} columns={columns[idx]} data={events || []} totalData={events?.length || 0} />
        ))}
      </FFormik.Form>
    </FFormik.Formik>
  ) : (
    <> Required configure the connectivity</>
  );
};
