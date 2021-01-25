import React, { FC, useCallback, useMemo, useState } from 'react';
import classnames from 'classnames';
import {
  Icon,
  useT,
  Table,
  Button,
  Loader,
  FFormik,
  useSearch,
  useDispatch,
  useSelector,
  FormikAutoSave,
  TableColumnProps,
} from '@frontegg/react-core';
import { IEmailSMSConfigResponse } from '@frontegg/rest-api';
import { connectivityActions } from '../../reducer';
import { IConnectivityComponent, IEventFormData, IPluginState, ITableFormData } from '../../interfaces';
import { filterCategories } from '../../utils';
import { FConnectivityCheckBox } from '../../elements/ConnectivityCheckBox';
import { InputEmailOrPhone } from '../../elements/InputEmailOrPhone';

interface IConnectivityForm extends IConnectivityComponent {
  form: 'email' | 'sms';
}

export const ConnectivityForm: FC<IConnectivityForm> = ({ form }) => {
  const { t } = useT();
  const dispatch = useDispatch();

  const [close, setClose] = useState<number[]>([]);
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
          events: events.map(({ recipients }) => {
            if (
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
        dispatch(connectivityActions.postDataAction({ platform: form, data: newData }));
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
                    !isFiltering && setClose(close.includes(idx) ? close.filter((e) => e !== idx) : [...close, idx]);
                  }}
                >
                  <Icon name={!close.includes(idx) || isFiltering ? 'down-arrow' : 'right-arrow'} />
                  {name}
                </Button>
              ),
            },
            {
              accessor: 'enabled',
              Header: t('common.enable'),
              Cell: ({ row: { index: rowIndex } }) => (
                <FConnectivityCheckBox name={`data[${index}].events[${rowIndex}].enabled`} />
              ),
              maxWidth: 50,
              minWidth: 50,
            },
            {
              accessor: 'events',
              Header: t(form === 'email' ? 'common.emails' : 'common.phones'),
              Cell: ({ row: { index: rowIndex } }) => (
                <InputEmailOrPhone
                  dataIdx={index}
                  eventIdx={rowIndex}
                  placeholder={t(form === 'email' ? 'connectivity.enterEmail' : 'connectivity.enterPhone')}
                />
              ),
            },
          ] as TableColumnProps<IEventFormData>[]
      ),
    [tablesData, t, close, isFiltering]
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

  return (
    <FFormik.Formik
      initialValues={{ data: tablesData }}
      validate={validate}
      onSubmit={(val, { setSubmitting }) => val.data && saveData(val.data, setSubmitting)}
    >
      <FFormik.Form>
        <FormikAutoSave isSaving={isSaving} />
        {Search}
        {filterTableData.map(({ id, events, index }, idx) => (
          <Table
            rowKey='id'
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
