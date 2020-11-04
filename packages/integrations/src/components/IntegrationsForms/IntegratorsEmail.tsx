import React, { FC } from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import { Button, FInput, Grid, useT, validateEmail, validateSchema } from '@frontegg/react-core';
import { IIntegrationsComponent } from '../../interfaces';
import { IntegrationsForm } from './IntegrationsForm';

export const IntegratorsEmail: FC<IIntegrationsComponent> = ({ onClose }) => {
  return <div>Email</div>;
  // const { t } = useT();
  // const validationSchema = validateSchema({
  //   from: validateEmail(t),
  //   to: Yup.array().of(validateEmail(t)).min(1),
  // });

  // return (
  //   <IntegrationsForm
  //     type='email'
  //     initialValues={{ from: '', to: [''] }}
  //     onClose={onClose}
  //     validationSchema={validationSchema}
  //   >
  //     {({ values: { to }, setFieldValue }: FormikProps<Omit<IEmailConfigurations, 'id'>>) => (
  //       <>
  //         <Grid item xs={1}>
  //           <label>{t('integrations.email.from')}: </label>
  //         </Grid>
  //         <Grid item xs={9}>
  //           <FInput name='from' />
  //         </Grid>
  //         <Grid item xs={2}>
  //           &nbsp;
  //         </Grid>
  //         {to.map((_, idx) => (
  //           <React.Fragment key={idx}>
  //             <Grid item xs={1}>
  //               {idx === 0 && `${t('integrations.email.to')}:`}
  //             </Grid>
  //             <Grid item xs={9}>
  //               <FInput name={`to[${idx}]`} />
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
