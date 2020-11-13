import React, { FC, useMemo } from 'react';
import {
  FInput,
  FFormik,
  TableColumnProps,
  FCheckbox,
  useDispatch,
  Table,
  useSelector,
  NotFound,
  FormikAutoSave,
  useT,
} from '@frontegg/react-core';
import { filterCategories } from '../../utils';
import { IIntegrationsComponent, IPluginState } from '../../interfaces';
import { FIntegrationCheckBox } from '../../elements/IntegrationCheckBox';

export const IntegrationsSMS: FC<IIntegrationsComponent> = () => {
  const { t } = useT();
  const dispatch = useDispatch();

  const { categories, channelMap, sms, isSaving } = useSelector(
    ({ integrations: { sms, isSaving, categories, channelMap } }: IPluginState) => ({
      sms,
      isSaving,
      categories,
      channelMap: channelMap?.sms,
    })
  );
  const cleanCategory = filterCategories(categories, channelMap);

  const tablesData = useMemo(
    () =>
      cleanCategory &&
      cleanCategory.map(({ id, name, events }) => ({
        id,
        name,
        events: events?.map(({ id, displayName, key }: any) => ({
          displayName,
          // ...smsData.smsSubscriptions.find(({ smsEvents }) => smsEvents.some(({ eventKey }) => eventKey === key)),
          id,
        })),
      })),
    [cleanCategory, sms]
  );

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
              Header: t('common.enable').toUpperCase(),
              Cell: ({ row: { index } }) => <FIntegrationCheckBox name={`data[${idx}].events[${index}].isActive`} />,
            },
            {
              accessor: 'smsEvents',
              Header: t('common.channels').toUpperCase(),
              Cell: () => <FInput name={`values[${idx}].events[0].sms`} />,
            },
            {
              accessor: 'non',
              Header: t('common.message').toUpperCase(),
              Cell: ({ row: { index } }) => {
                return <FInput name={`values[${idx}].events[${index}].message`} />;
              },
            },
          ] as TableColumnProps<{}>[]
      ),
    [tablesData, t]
  );

  return tablesData ? (
    <FFormik.Formik initialValues={{ values: tablesData }} onSubmit={(val) => console.log(val)}>
      <FFormik.Form>
        <FormikAutoSave isSaving={isSaving} />
        {(tablesData || []).map(({ id, events }, idx) => (
          <Table rowKey='id' key={id} columns={columns[idx]} data={events || []} totalData={events?.length || 0} />
        ))}
      </FFormik.Form>
    </FFormik.Formik>
  ) : (
    <NotFound />
  );
};
