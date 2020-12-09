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
import { ISlackConfigurations, ISlackSubscription } from '@frontegg/rest-api';
import { IConnectivityComponent, IPluginState, ISlackEventData, ISlackTableData } from '../../interfaces';
import { connectivityActions } from '../../reducer';
import { filterCategories } from '../../utils';
import { SelectSlack } from '../../elements/SelectSlack';
import { FIntegrationCheckBox } from '../../elements/IntegrationCheckBox';
import { ConnectivitySlackAuth } from './ConnectivitySlackAuth';
import { MessageSlack } from '../../elements/MessgaeSlack';

export const ConnectivitySlack: FC<IConnectivityComponent> = () => {
  const { t } = useT();
  const dispatch = useDispatch();
  const [opens, setOpens] = useState<number[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const { isLoading, categories, channelMap, slack, isSaving, slackChannels } = useSelector(
    ({
      connectivity: {
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

  const tablesData: ISlackTableData[] | undefined = useMemo(
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
                  className='fe-connectivity-accordion-button'
                  onClick={() => {
                    !isFiltering && setOpens(opens.includes(idx) ? opens.filter((e) => e !== idx) : [...opens, idx]);
                  }}
                >
                  <Icon name={opens.includes(idx) || isFiltering ? 'down-arrow' : 'right-arrow'} />
                  {name}
                </Button>
              ),
            },
            {
              accessor: 'isActive',
              Header: t('common.enabled'),
              Cell: ({ row: { index: rowIndex } }) => (
                <FIntegrationCheckBox name={`data[${index}].events[${rowIndex}].isActive`} />
              ),
              maxWidth: 40,
            },
            {
              accessor: 'slackEvents',
              Header: t('common.channels'),
              Cell: ({ row: { index: rowIndex } }) => <SelectSlack eventIdx={rowIndex} dataIdx={index} />,
            },
            {
              accessor: 'non',
              Header: t('common.message'),
              Cell: ({ row: { index: rowIndex } }) => <MessageSlack eventIdx={rowIndex} dataIdx={index} />,
            },
          ] as TableColumnProps<ISlackEventData>[]
      ),
    [tablesData, t, opens, isFiltering]
  );

  useEffect(() => {
    dispatch(connectivityActions.loadSlackActions());
    return () => {
      dispatch(connectivityActions.cleanSlackData());
    };
  }, [dispatch]);

  const [filterTableData, Search] = useSearch({
    data: tablesData,
    filteredBy: 'name',
    filterFunction: (allData: ISlackTableData[], regexp, isEmpty) => {
      const result = isEmpty
        ? allData
        : (allData
            .map(({ name, events, ...cat }) => {
              const eventsFiltered = events?.filter(({ displayName }) => regexp.test(displayName)) ?? [];
              return regexp.test(name) || eventsFiltered.length
                ? { ...cat, name, events: regexp.test(name) ? events : eventsFiltered }
                : null;
            })
            .filter((e) => !!e) as ISlackTableData[]);
      setIsFiltering(!isEmpty);
      return result;
    },
  });

  const saveData = useCallback(
    (data?: ISlackTableData[]) => {
      if (!slack || !data) return;
      const { id } = slack;
      const newData: ISlackConfigurations = {
        id,
        // @ts-ignore
        slackSubscriptions: data.reduce((acc: ISlackSubscription[], curr: ISlackTableData) => {
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

      dispatch(connectivityActions.postDataAction('slack', newData));
    },
    [dispatch, slack]
  );

  if (isLoading) {
    return <Loader center />;
  }

  if (!isLoading && !slackChannels?.length && filterTableData.length) {
    return <ConnectivitySlackAuth />;
  }

  // if (!tablesData?.length) {
  //   return <> Required configure the connectivity</>;
  // }

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
              className={classnames('fe-connectivity-table-accordion', {
                'fe-connectivity-open': opens.includes(idx) || isFiltering,
              })}
            />
          ))
        ) : (
          <NotFound />
        )}
      </FFormik.Form>
    </FFormik.Formik>
  );
};
