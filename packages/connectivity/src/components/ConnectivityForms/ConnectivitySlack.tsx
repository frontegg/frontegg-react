import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import {
  useT,
  Icon,
  Table,
  Loader,
  Button,
  FFormik,
  FormikAutoSave,
  TableColumnProps,
  useSearch,
} from '@frontegg/react-core';
import { ISlackConfigurations, ISlackSubscription } from '@frontegg/rest-api';
import { IConnectivityComponent, ISlackEventData, ISlackTableData } from '../../interfaces';
import { filterCategories } from '../../utils';
import { SelectSlack } from '../../elements/SelectSlack';
import { FConnectivityCheckBox } from '../../elements/ConnectivityCheckBox';
import { ConnectivitySlackAuth } from './ConnectivitySlackAuth';
import { MessageSlack } from '../../elements/MessageSlack';
import { useConnectivityActions, useConnectivityState } from '@frontegg/react-hooks';

export const ConnectivitySlack: FC<IConnectivityComponent> = () => {
  const { t } = useT();
  const [close, setClose] = useState<number[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const {
    categories,
    channelMap: _channelMap,
    slack,
    isSaving,
    slackChannels: _slackChannels,
  } = useConnectivityState();
  const slackChannels = _slackChannels?.data;
  const channelMap = _channelMap?.slack;
  const isLoading = _slackChannels?.isLoading;

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
    [cleanCategory]
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
                    !isFiltering && setClose(close.includes(idx) ? close.filter((e) => e !== idx) : [...close, idx]);
                  }}
                >
                  <Icon name={!close.includes(idx) || isFiltering ? 'down-arrow' : 'right-arrow'} />
                  {name}
                </Button>
              ),
            },
            {
              accessor: 'isActive',
              Header: t('common.enabled'),
              Cell: ({ row: { index: rowIndex } }) => (
                <FConnectivityCheckBox name={`data[${index}].events[${rowIndex}].isActive`} />
              ),
              maxWidth: 50,
              minWidth: 50,
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
    [t, close, isFiltering]
  );

  const { loadSlackActions, cleanSlackData, postDataAction } = useConnectivityActions();

  useEffect(() => {
    console.log('Load');
    loadSlackActions();
    return () => {
      cleanSlackData();
    };
  }, []);

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
    ({ data }: { data?: ISlackTableData[] }) => {
      console.log('Saving data');
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

      postDataAction({ platform: 'slack', data: newData });
    },
    [slack]
  );

  if (isLoading) {
    return <Loader center />;
  }

  if (!isLoading && !slackChannels?.length && !tablesData?.length) {
    return <ConnectivitySlackAuth />;
  }

  return (
    <FFormik.Formik initialValues={{ data: tablesData }} onSubmit={saveData} enableReinitialize>
      <FFormik.Form>
        <FormikAutoSave isSaving={isSaving} debounceMs={50} />
        {Search}
        {filterTableData.map(({ id, events, index }, idx) => (
          <Table
            rowKey='eventId'
            key={id}
            columns={columns[index]}
            data={events || []}
            totalData={events?.length || 0}
            className={classnames('fe-connectivity-table-accordion', {
              'fe-connectivity-open': !close.includes(idx) || isFiltering,
            })}
          />
        ))}
      </FFormik.Form>
    </FFormik.Formik>
  );
};
