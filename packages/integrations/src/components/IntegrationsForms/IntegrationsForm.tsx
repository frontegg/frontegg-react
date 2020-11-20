import {
  FFormik,
  FInput,
  FInputChip,
  FormikAutoSave,
  Loader,
  NotFound,
  Table,
  TableColumnProps,
  useDispatch,
  useSelector,
  useT,
} from '@frontegg/react-core';
import React, { FC, useCallback, useMemo } from 'react';
import { integrationsActions } from '../../reducer';
import { IIntegrationsComponent, IPluginState } from '../../interfaces';
import { IEmailSMSConfigResponse, IEmailSMSSubscriptionResponse } from '@frontegg/rest-api';
import { filterCategories } from '../../utils';
import { FIntegrationCheckBox } from '../../elements/IntegrationCheckBox';

interface ITableData {
  id: string;
  name: string;
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
            if (enabled && recipients.length) {
              return { recipients: t('integration.recipients.required') };
            } else if (
              // TODO fix the validation
              recipients
                .filter((e) => !!e)
                .some((e) =>
                  form === 'email' ? !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e) : !/^\+?\d{12}$/.test(e)
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

  const cleanCategory = filterCategories(categories, channelMap);

  const tablesData: ITableData[] | null = useMemo(
    () =>
      (cleanCategory &&
        data &&
        cleanCategory.map(({ id, name, events }) => {
          return {
            id,
            name,
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
        })) ??
      null,
    [cleanCategory, data]
  );

  const Input = useCallback(
    ({ name, disabled }: { name: string; disabled: boolean }) => <FInput disabled={disabled} name={name} />,
    [tablesData]
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
              maxWidth: 30,
            },
            {
              accessor: 'events',
              Header: t(form === 'email' ? 'common.emails' : 'common.sms').toUpperCase(),
              Cell: ({
                row: {
                  index,
                  original: { enabled },
                },
              }) => <FInputChip disabled={!enabled} name={`data[${idx}].events[${index}].recipients`} />,
            },
            // {
            //   accessor: 'non',
            //   Header: t('common.message').toUpperCase(),
            //   Cell: ({ row: { index } }) => {
            //     return <FInput name={`data[${idx}].events[${index}].message`} disabled />;
            //   },
            // },
          ] as TableColumnProps<IEventData>[]
      ),
    [tablesData, t]
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
        {(tablesData || []).map(({ id, events }, idx) => (
          <Table rowKey='id' key={id} columns={columns[idx]} data={events || []} totalData={events?.length || 0} />
        ))}
      </FFormik.Form>
    </FFormik.Formik>
  ) : (
    <NotFound />
  );
};
