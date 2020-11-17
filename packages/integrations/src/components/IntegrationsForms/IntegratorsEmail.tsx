import React, { FC, useCallback, useMemo } from 'react';
import {
  FFormik,
  FInput,
  FormikAutoSave,
  Loader,
  NotFound,
  Table,
  TableColumnProps,
  useDispatch,
  useSelector,
  useT,
  validateEmail,
  validateSchema,
} from '@frontegg/react-core';
import { IIntegrationsComponent, IPluginState } from '../../interfaces';
import { filterCategories } from '../../utils';
import { FIntegrationCheckBox } from '../../elements/IntegrationCheckBox';
import { IEmailConfigResponse, IEmailSubscriptionResponse } from '@frontegg/rest-api';
import { integrationsActions } from '../../reducer';
import { string } from 'yargs';

interface ITableData {
  id: string;
  name: string;
  events?: {
    displayName: string;
    id: string;
    enabled: boolean;
    eventKey: string;
    recipients: string;
    subscriptions: Pick<IEmailSubscriptionResponse, 'id' | 'name'>;
  }[];
}

export const IntegratorsEmail: FC<IIntegrationsComponent> = () => {
  const { t } = useT();
  const dispatch = useDispatch();

  const { categories, channelMap, email, isSaving, isLoading } = useSelector(
    ({ integrations: { isLoading, email, isSaving, categories, channelMap } }: IPluginState) => ({
      isLoading,
      email,
      isSaving,
      categories,
      channelMap: channelMap?.email,
    })
  );

  const validate = useCallback(
    (values) => {
      const errors = values.data.map((data: ITableData) => {
        const { events = [] } = data;
        return {
          events: events.map(({ enabled, recipients }) => {
            if (enabled && recipients.trim() === '') {
              return { recipients: t('integration.recipients.required') };
            } else if (
              recipients
                .split(' ')
                .filter((e) => !!e)
                .some((e) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e))
            ) {
              return { recipients: t('integration.recipients.wrong') };
            }
            return null;
          }),
        };
      });
      return errors.filter(({ events }: { events: string[] }) => events.filter((el: string) => !!el).length).length
        ? { data: errors }
        : {};
    },

    [t]
  );
  const cleanCategory = filterCategories(categories, channelMap);

  const tablesData: ITableData[] | null = useMemo(
    () =>
      (cleanCategory &&
        email &&
        cleanCategory.map(({ id, name, events }) => {
          return {
            id,
            name,
            events: events?.map(({ id, displayName, key }: any) => {
              const {
                subscriptions: [{ recipients, ...subscriptions }],
                ...config
              } = email.find(({ eventKey }) => eventKey === key) || {
                subscriptions: [{ recipients: [], name: '', id: '' }],
                eventKey: key,
                enabled: false,
              };
              return {
                id,
                displayName,
                ...config,
                recipients: recipients.join(' '),
                subscriptions,
              };
            }),
          };
        })) ??
      null,
    [cleanCategory, email]
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
              accessor: 'enabled',
              Header: t('common.enable').toUpperCase(),
              Cell: ({ row: { index } }) => <FIntegrationCheckBox name={`data[${idx}].events[${index}].enabled`} />,
            },
            {
              accessor: 'smsEvents',
              Header: t('common.emails').toUpperCase(),
              Cell: ({ row: { index } }) => <FInput name={`data[${idx}].events[${index}].recipients`} />,
            },
            // {
            //   accessor: 'non',
            //   Header: t('common.message').toUpperCase(),
            //   Cell: ({ row: { index } }) => {
            //     return <FInput name={`data[${idx}].events[${index}].message`} disabled />;
            //   },
            // },
          ] as TableColumnProps<ITableData>[]
      ),
    [tablesData, t]
  );

  const saveData = useCallback(
    (data: ITableData[]) => {
      const newData: IEmailConfigResponse[] = data.reduce((acc: IEmailConfigResponse[], curr: ITableData) => {
        const { events = [] } = curr;
        return [
          ...acc,
          ...events.map(
            ({ enabled, eventKey, recipients, subscriptions }): IEmailConfigResponse => ({
              enabled,
              eventKey,
              subscriptions: [{ ...subscriptions, enabled, recipients: recipients.split(' ').filter((el) => !!el) }],
            }),
            []
          ),
        ];
      }, []);
      dispatch(integrationsActions.postDataAction('email', newData));
    },
    [dispatch]
  );

  if (isLoading) {
    return <Loader center />;
  }

  return tablesData ? (
    <FFormik.Formik
      enableReinitialize
      initialValues={{ data: tablesData }}
      validate={validate}
      onSubmit={(val) => saveData(val.data)}
    >
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
