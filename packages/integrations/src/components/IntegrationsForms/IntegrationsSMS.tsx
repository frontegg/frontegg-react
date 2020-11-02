import React, { FC } from 'react';
import { FormikProps } from 'formik';
import { Button, FInput, Grid, ISMSConfigurations, useT, validateSchema, validationPhone } from '@frontegg/react-core';
import { IIntegrationsComponent } from '../../interfaces';
import { IntegrationsForm } from './IntegrationsForm';

export const IntegrationsSMS: FC<IIntegrationsComponent> = ({ onClose }) => {
  return <div> SMS</div>;
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
