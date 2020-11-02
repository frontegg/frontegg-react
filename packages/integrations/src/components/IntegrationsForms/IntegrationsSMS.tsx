import React, { FC, useEffect, useMemo } from 'react';
import { FormikProps } from 'formik';
import {
  Button,
  FInput,
  Grid,
  ISMSConfigurations,
  useT,
  Loader,
  FFormik,
  validateSchema,
  validationPhone,
  TableColumnProps,
  FCheckbox,
  useDispatch,
  Table,
  useSelector,
} from '@frontegg/react-core';
import { filterCategories } from '../../utils';
import { IIntegrationsComponent, IPluginState } from '../../interfaces';
import { IntegrationsForm } from './IntegrationsForm';
import { integrationsActions } from '../../reducer';
import { SelectSlack } from '../../elements/SelectSlack';

const smsData = {
  _id: '5fa003109712b2002aed6290',
  vendorId: '56303562-1554-42e7-a3bc-d59e3ccd406b',
  tenantId: 'my-tenant-id',
  smsSubscriptions: [
    {
      isActive: true,
      smsEvents: [
        { eventKey: 'general.status', title: 'qwe', message: 'we', channelIds: ['C0167PM6Y87', 'C016UMCDYMS'] },
      ],
    },
  ],
};

export const IntegrationsSMS: FC<IIntegrationsComponent> = ({ onClose }) => {
  const dispatch = useDispatch();

  const { isLoading, categories, channelMap, sms } = useSelector(
    ({
      integrations: {
        slackChannels: { isLoading },
        categories,
        channelMap,
        sms,
      },
    }: IPluginState) => ({
      isLoading,
      categories,
      sms,
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
          ...smsData.smsSubscriptions.find(({ smsEvents }) => smsEvents.some(({ eventKey }) => eventKey === key)),
          id,
        })),
      })),
    [cleanCategory, smsData.smsSubscriptions]
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
              Header: 'ENABLED',
              Cell: ({ row: { index } }) => (
                <FCheckbox
                  inForm
                  className='fe-integrations-checkbox'
                  name={`values[${idx}].events[${index}].isActive`}
                />
              ),
            },
            {
              accessor: 'smsEvents',
              Header: 'CHANNELS',
              Cell: () => <SelectSlack name={`values[${idx}].events[0].sms`} />,
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
    // dispatch(integrationsActions.loadSlackActions());
    return () => {
      // dispatch(integrationsActions.cleanSlackData());
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

  // const { t } = useT();
  // const validationSchema = validateSchema({
  //   to: validationPhone(t),
  // });
  // return (
  //   <IntegrationsForm validationSchema={validationSchema} onClose={onClose} type='sms' initialValues={{ to: [''] }}>
  //     {({ values: { to }, setFieldValue }: FormikProps<Omit<ISMSConfigurations, 'id'>>) => (
  //       <>
  //         {to.map((_, idx) => (
  //           <React.Fragment key={idx}>
  //             <Grid item xs={1}>
  //               {idx === 0 && t('integrations.sms.to')}
  //             </Grid>
  //             <Grid item xs={9}>
  //               <FInput name={`to[${idx}]`} placeholder='+123456789012' />
  //             </Grid>
  //             <Grid item xs={2}>
  //               <Button
  //                 disabled={to.length === 1}
  //                 onClick={() => setFieldValue('to', [...to.slice(0, idx), ...to.slice(idx + 1)])}
  //               >
  //                 -
  //               </Button>
  //             </Grid>
  //           </React.Fragment>
  //         ))}
  //         <Grid item xs={10}>
  //           &nbsp;
  //         </Grid>
  //         <Grid item xs={2}>
  //           <Button onClick={() => setFieldValue('to', [...to, ''])}>+</Button>
  //         </Grid>
  //       </>
  //     )}
  //   </IntegrationsForm>
  // );
};
