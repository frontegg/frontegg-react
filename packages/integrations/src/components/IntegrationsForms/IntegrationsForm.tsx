import React, { FC, useCallback, useMemo, useState } from 'react';
import classnames from 'classnames';
import {
  Icon,
  useT,
  Table,
  Button,
  Loader,
  FFormik,
  NotFound,
  FInputChip,
  useDispatch,
  useSelector,
  FormikAutoSave,
  TableColumnProps,
  useSearch,
} from '@frontegg/react-core';
import { IEmailSMSConfigResponse, IEmailSMSSubscriptionResponse } from '@frontegg/rest-api';
import { integrationsActions } from '../../reducer';
import { IIntegrationsComponent, IPluginState } from '../../interfaces';
import { filterCategories } from '../../utils';
import { FIntegrationCheckBox } from '../../elements/IntegrationCheckBox';
import { all } from 'redux-saga/effects';

interface ITableData {
  id: string;
  name: string;
  index: number;
  events?: IEventData[];
}

interface IEventData {
  displayName: string;
  id: string;
  enabled: boolean;
  eventKey: string;
  recipients: string[];
  subscriptions: Pick<IEmailSMSSubscriptionResponse, 'id' | 'name'>;
}
interface IIntegrationsForm extends IIntegrationsComponent {
  form: 'email' | 'sms';
}

export const IntegrationsForm: FC<IIntegrationsForm> = ({ form }) => {
  const { t } = useT();
  const dispatch = useDispatch();

  const [opens, setOpens] = useState<number[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const { categories, channelMap, data, isSaving, isLoading } = useSelector(
    ({ integrations: { isLoading, isSaving, categories, channelMap, ...integrations } }: IPluginState) => ({
      isLoading,
      data: integrations[form],
      isSaving,
      categories,
      channelMap: channelMap && channelMap[form],
    })
  );

  const validate = useCallback(
    (values) => {
      const errors = values.data.map((data: ITableData) => {
        const { events = [] } = data;
        return {
          events: events.map(({ enabled, recipients }) => {
            if (
              enabled &&
              recipients
                .filter((e) => !!e)
                .some(
                  (e) =>
                    !(form === 'email' ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e) : /^\+?\d{12}$/.test(e))
                )
            ) {
              return {
                recipients: t(
                  form === 'email' ? 'integrations.recipients.wrongEmail' : 'integrations.recipients.wrongPhone'
                ),
              };
            }
            return null;
          }),
        };
      });
      return errors.filter(({ events }: { events: string[] }) => events.filter((el: string) => !!el).length).length
        ? { data: errors }
        : {};
    },

    [t, form]
  );

  const saveData = useCallback(
    (formData: ITableData[], setSubmitting) => {
      const newData: IEmailSMSConfigResponse[] = formData.reduce((acc: IEmailSMSConfigResponse[], curr: ITableData) => {
        const { events = [] } = curr;
        return [
          ...acc,
          ...events.map(
            ({ enabled, eventKey, recipients, subscriptions }): IEmailSMSConfigResponse => ({
              enabled,
              eventKey,
              subscriptions: [{ ...subscriptions, enabled, recipients: recipients.filter((el) => !!el) }],
            }),
            []
          ),
        ];
      }, []);
      if (JSON.stringify(newData) !== JSON.stringify(data)) {
        dispatch(integrationsActions.postDataAction(form, newData));
      } else {
        setSubmitting(false);
      }
    },
    [dispatch, data]
  );

  const cleanCategory = filterCategories(categories, channelMap);

  const tablesData: ITableData[] | undefined = useMemo(
    () =>
      cleanCategory &&
      data &&
      cleanCategory.map(({ id, name, events, index }) => {
        return {
          id,
          name,
          index,
          events: events?.map(({ id, displayName, key }: any) => {
            const {
              subscriptions: [{ recipients, ...subscriptions }],
              ...config
            } = data.find(({ eventKey }) => eventKey === key) || {
              subscriptions: [{ recipients: [], name: '', id: '' }],
              eventKey: key,
              enabled: false,
            };
            return {
              id,
              displayName,
              ...config,
              recipients,
              subscriptions,
            };
          }),
        };
      }),
    [cleanCategory, data]
  );

  const columns = useMemo(
    () =>
      (tablesData || [])?.map(
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
              accessor: 'enabled',
              Header: t('common.enable').toUpperCase(),
              Cell: ({ row: { index: rowIndex } }) => (
                <FIntegrationCheckBox name={`data[${index}].events[${rowIndex}].enabled`} />
              ),
              maxWidth: 30,
            },
            {
              accessor: 'events',
              Header: t(form === 'email' ? 'common.emails' : 'common.sms').toUpperCase(),
              Cell: ({
                row: {
                  index: rowIndex,
                  original: { enabled },
                },
              }) => <FInputChip disabled={!enabled} name={`data[${index}].events[${rowIndex}].recipients`} fullWidth />,
            },
            // {
            //   accessor: 'non',
            //   Header: t('common.message').toUpperCase(),
            //   Cell: ({ row: { index:rowIndex } }) => {
            //     return <FInput name={`data[${index}].events[${rowIndex}].message`} disabled />;
            //   },
            // },
          ] as TableColumnProps<IEventData>[]
      ),
    [tablesData, t, opens]
  );

  const [filterTableData, Search] = useSearch({
    data: tablesData,
    filteredBy: 'name',
    filterFunction: (allData: ITableData[], regexp, isEmpty) => {
      const result = isEmpty
        ? allData
        : (allData
            .map(({ name, events, ...cat }) => {
              const eventsFiltered = events?.filter(({ eventKey }) => regexp.test(eventKey)) ?? [];
              return regexp.test(name) || eventsFiltered.length
                ? { ...cat, name, events: regexp.test(name) ? events : eventsFiltered }
                : null;
            })
            .filter((e) => !!e) as ITableData[]);
      setIsFiltering(!isEmpty);
      return result;
    },
  });

  if (isLoading) {
    return <Loader center />;
  }

  return tablesData ? (
    <FFormik.Formik
      enableReinitialize
      initialValues={{ data: tablesData }}
      validate={validate}
      onSubmit={(val, { setSubmitting }) => saveData(val.data, setSubmitting)}
    >
      <FFormik.Form>
        <FormikAutoSave isSaving={isSaving} />
        {Search}
        {filterTableData.length ? (
          filterTableData.map(({ id, events, index }, idx) => (
            <Table
              rowKey='id'
              key={id}
              columns={columns[index]}
              data={events || []}
              totalData={events?.length || 0}
              className={classnames('fe-integrations-table-accordion', {
                'fe-integrations-open': opens.includes(idx) || isFiltering,
              })}
            />
          ))
        ) : (
          <NotFound />
        )}
      </FFormik.Form>
    </FFormik.Formik>
  ) : (
    <NotFound />
  );
};
