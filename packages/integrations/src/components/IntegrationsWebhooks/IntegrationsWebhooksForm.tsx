import React, { FC, useEffect } from 'react';
import {
  Button,
  Dialog,
  FButton,
  FFormik,
  FInput,
  Grid,
  useDispatch,
  useSelector,
  useT,
  validateRequired,
  validateSchema,
} from '@frontegg/react-core';
import { initialValues } from './consts';
import { IWebhooksSaveData } from '@frontegg/rest-api';
import { AccordingCategories } from '../../elements/AccordingCategories';
import { SelectWebhook } from '../../elements/SelectWebhook';
import { filterCategories } from '../../utils';
import { IPluginState } from '../../interfaces';
import { integrationsActions } from '../../reducer';

export interface IIntegrationsWebhooksForm {
  data: IWebhooksSaveData | null;
}

export const IntegrationsWebhooksForm: FC<IIntegrationsWebhooksForm> = ({ data }) => {
  const t = useT();
  const dispatch = useDispatch();
  const { categories, channelMap, isTesting, testResult } = useSelector(
    ({ integrations: { categories, channelMap, isTesting, testResult } }: IPluginState) => ({
      categories,
      channelMap: channelMap && channelMap.webhook,
      isTesting,
      testResult,
    })
  );
  useEffect(() => {
    return () => {
      dispatch(integrationsActions.cleanWebhookTestData());
    };
  }, [dispatch]);

  // const validationSchema = validateSchema({
  //   displayName: validateRequired('displayName', t),
  // });

  const cleanCategory = filterCategories(categories, channelMap);

  return (
    <>
      <FFormik.Formik
        // validationSchema={validationSchema}
        initialValues={{ ...initialValues, ...data }}
        onSubmit={(val) => {
          dispatch(integrationsActions.postDataAction('webhook', val));
        }}
      >
        {({ values: { secret, url } }) => (
          <FFormik.Form>
            <Grid container wrap='nowrap'>
              <Grid item className='fe-integrations-webhook-settings' xs={6}>
                <h2>General settings</h2>
                <FInput label='Display Name' name='displayName' placeholder='Input name...' />
                <FInput label='Description' name='description' multiline placeholder='Add short description' />
                <FInput label='URL' name='url' placeholder='https://' />
                <FInput label={<>Secret Key</>} name='secret' placeholder='Secret key' />
                <Grid container justifyContent='space-between'>
                  <Grid>
                    <FButton type='submit'>UPDATE HOOK</FButton>
                  </Grid>
                  <Grid>
                    <Button
                      loading={isTesting}
                      onClick={() => dispatch(integrationsActions.postWebhookTestAction({ secret, url }))}
                    >
                      {testResult?.status.toUpperCase() ?? 'TEST HOOK'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className='fe-integrations-webhook-settings' xs={6}>
                <h2>EventSettings</h2>
                <div>
                  <h3>Select Events</h3>
                  <SelectWebhook cleanCategory={cleanCategory} />
                  <h3>Manage categories</h3>
                  <AccordingCategories cleanCategory={cleanCategory} />
                </div>
              </Grid>
            </Grid>
          </FFormik.Form>
        )}
      </FFormik.Formik>
      <Dialog
        className={`fe-integrations-webhook-dialog-${testResult?.status || ''}`}
        open={!!testResult?.message}
        onClose={() => dispatch(integrationsActions.cleanWebhookTestMessage())}
      >
        <pre>{testResult?.message}</pre>
      </Dialog>
    </>
  );
};
