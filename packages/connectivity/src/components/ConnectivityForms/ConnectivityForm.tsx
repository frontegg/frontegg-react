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
import { IEmailSMSConfigResponse } from '@frontegg/rest-api';
import { connectivityActions } from '../../reducer';
import { IConnectivityComponent, IEventFormData, IPluginState, ITableFormData } from '../../interfaces';
import { filterCategories } from '../../utils';
import { FIntegrationCheckBox } from '../../elements/IntegrationCheckBox';
import { InputEmailOrPhone } from '../../elements/InputEmailOrPhone';

interface IConnectivityForm extends IConnectivityComponent {
  form: 'email' | 'sms';
}

export const ConnectivityForm: FC<IConnectivityForm> = ({ form }) => {
  const { t } = useT();
  const dispatch = useDispatch();

  const [opens, setOpens] = useState<number[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const { categories, channelMap, data, isSaving, isLoading } = useSelector(
    ({ connectivity: { isLoading, isSaving, categories, channelMap, ...connectivity } }: IPluginState) => ({
      isLoading,
      data: connectivity[form],
      isSaving,
      categories,
      channelMap: channelMap && channelMap[form],
    })
  );

  const validate = useCallback(
    (values) => {
      const errors = values.data.map((data: ITableFormData) => {
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
                  form === 'email' ? 'connectivity.recipients.wrongEmail' : 'connectivity.recipients.wrongPhone'
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
    (formData: ITableFormData[], setSubmitting) => {
      const newData: IEmailSMSConfigResponse[] = formData.reduce(
        (acc: IEmailSMSConfigResponse[], curr: ITableFormData) => {
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
        },
        []
      );
      if (JSON.stringify(newData) !== JSON.stringify(data)) {
        dispatch(connectivityActions.postDataAction(form, newData));
      } else {
        setSubmitting(false);
      }
    },
    [dispatch, data]
  );

  const cleanCategory = filterCategories(categories, channelMap);

  const tablesData: ITableFormData[] | undefined = useMemo(
    () =>
      cleanCategory &&
      data &&
      cleanCategory.map(({ id, name, events, index }) => {
        return {
          id,
          name,
          index,
          events:
            events?.map(({ id, displayName, key }: any) => {
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
            }) ?? [],
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
              accessor: 'enabled',
              Header: t('common.enable'),
              Cell: ({ row: { index: rowIndex } }) => (
                <FIntegrationCheckBox name={`data[${index}].events[${rowIndex}].enabled`} />
              ),
              maxWidth: 30,
            },
            {
              accessor: 'events',
              Header: t(form === 'email' ? 'common.emails' : 'common.phones'),
              Cell: ({ row: { index: rowIndex } }) => <InputEmailOrPhone dataIdx={index} eventIdx={rowIndex} />,
            },
            // {
            //   accessor: 'non',
            //   Header: t('common.message').toUpperCase(),
            //   Cell: ({ row: { index:rowIndex } }) => {
            //     return <FInput name={`data[${index}].events[${rowIndex}].message`} disabled />;
            //   },
            // },
          ] as TableColumnProps<IEventFormData>[]
      ),
    [tablesData, t, opens, isFiltering]
  );

  const [filterTableData, Search] = useSearch({
    data: tablesData,
    filteredBy: 'name',
    filterFunction: (allData: ITableFormData[], regexp, isEmpty) => {
      const result = isEmpty
        ? allData
        : (allData
            .map(({ name, events, ...cat }) => {
              const eventsFiltered = events?.filter(({ eventKey }) => regexp.test(eventKey)) ?? [];
              return regexp.test(name) || eventsFiltered.length
                ? { ...cat, name, events: regexp.test(name) ? events : eventsFiltered }
                : null;
            })
            .filter((e) => !!e) as ITableFormData[]);
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
  ) : (
    <NotFound />
  );
};
