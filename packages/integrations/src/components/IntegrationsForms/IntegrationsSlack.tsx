import React, { FC, useEffect, useMemo } from 'react';
import {
  FCheckbox,
  FFormik,
  FInput,
  Loader,
  Table,
  TableColumnProps,
  useDispatch,
  useSelector,
} from '@frontegg/react-core';
import { IIntegrationsComponent, IPluginState } from '../../interfaces';
import { integrationsActions } from '../../reducer';
import { filterCategories } from '../../utils';
import { InputDebounce } from '../../elements/InputDebounce';
import { SelectSlack } from '../../elements/SelectSlack';

export const IntegrationsSlack: FC<IIntegrationsComponent> = () => {
  const dispatch = useDispatch();
  const { isLoading, categories, channelMap, slack } = useSelector(
    ({
      integrations: {
        slackChannels: { isLoading },
        categories,
        channelMap,
        slack,
      },
    }: IPluginState) => ({
      isLoading,
      categories,
      slack,
      channelMap: channelMap?.slack,
    })
  );
  const cleanCategory = filterCategories(categories, channelMap);
  const { slackSubscriptions } = slack ?? { slackSubscriptions: null };

  const tablesData = useMemo(
    () =>
      cleanCategory &&
      slackSubscriptions &&
      cleanCategory.map(({ id, name, events }) => ({
        id,
        name,
        events: events?.map(({ id, displayName, key }) => ({
          displayName,
          ...slackSubscriptions.find(({ slackEvents }) => slackEvents.some(({ eventKey }) => eventKey === key)),
          id,
        })),
      })),
    [cleanCategory, slackSubscriptions]
  );

  console.log({ tablesData });
  const columns = useMemo(
    () =>
      (tablesData || [])?.map(
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
                <FCheckbox
                  inForm
                  className='fe-integrations-checkbox'
                  name={`values[${idx}].events[${index}].slackEvents[0].isActive`}
                />
              ),
            },
            {
              accessor: 'slackEvents',
              Header: 'CHANNELS',
              Cell: () => <SelectSlack name={`values[${idx}].events[0].slack`} />,
            },
            {
              accessor: 'non',
              Header: 'MESSAGE',
              // Cell: ({ value }) => <InputDebounce value={value?.message || ''} onChange={(v) => console.log(v)} />,
              Cell: ({ row: { index }, ...val }) => {
                // console.log( });
                return <FInput name={`values[${idx}].events[${index}].message`} />;
              },
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

  return isLoading ? (
    <Loader center />
  ) : tablesData ? (
    <FFormik.Formik initialValues={{ values: tablesData }} onSubmit={(val) => console.log(val)}>
      <FFormik.Form>
        {(tablesData || []).map(({ id, events }, idx) => (
          <Table rowKey='id' key={id} columns={columns[idx]} data={events || []} totalData={events?.length || 0} />
        ))}
      </FFormik.Form>
    </FFormik.Formik>
  ) : (
    <> Required configure the connectivity</>
  );
};
