import React, { FC, useEffect } from 'react';
import {
  Grid,
  useT,
  Button,
  Dialog,
  FInput,
  FButton,
  FFormik,
  useDispatch,
  useSelector,
  validateUrl,
  validateSchema,
  validateRequired,
  validateLength,
  validateArrayLength,
  Popup,
} from '@frontegg/react-core';
import { initialValues } from './consts';
import { IWebhooksSaveData } from '@frontegg/rest-api';
import { AccordingCategories } from '../../elements/AccordingCategories';
import { SelectWebhook } from '../../elements/SelectWebhook';
import { filterCategories } from '../../utils';
import { IPluginState } from '../../interfaces';
import { connectivityActions } from '../../reducer';

export interface IConnectivityWebhooksForm {
  data: IWebhooksSaveData | null;
}

export const ConnectivityWebhooksForm: FC<IConnectivityWebhooksForm> = ({ data }) => {
  const { t } = useT();
  const dispatch = useDispatch();
  const { categories, channelMap, isTesting, testResult } = useSelector(
    ({ connectivity: { categories, channelMap, isTesting, testResult } }: IPluginState) => ({
      categories,
      channelMap: channelMap && channelMap.webhook,
      isTesting,
      testResult,
    }),
  );
  useEffect(() => {
    return () => {
      dispatch(connectivityActions.cleanWebhookTestData());
    };
  }, [dispatch]);

  const validationSchema = validateSchema({
    displayName: validateRequired(t('common.displayName'), t),
    url: validateUrl('URL', t),
    secret: validateLength(t('common.secretKey'), 8, t),
    eventKeys: validateArrayLength(t, t('connectivity.events')),
  });

  const cleanCategory = filterCategories(categories, channelMap);

  return (
    <>
      <FFormik.Formik
        validationSchema={validationSchema}
        initialValues={{ ...initialValues, ...data }}
        onSubmit={(val) => {
          dispatch(connectivityActions.postDataAction('webhook', val));
        }}
      >
        {({ values: { secret, url }, isSubmitting }) => (
          <FFormik.Form>
            <Grid container wrap='nowrap'>
              <Grid item className='fe-connectivity-webhook-settings' xs={6}>
                <h2>{t('connectivity.generalSettings')}</h2>
                <FInput label={t('common.displayName')} name='displayName' placeholder={t('connectivity.inputName')} />
                <FInput
                  label={t('common.description')}
                  name='description'
                  multiline
                  placeholder={t('connectivity.shortDescription')}
                />
                <FInput label='URL' name='url' placeholder='https://' />
                <FInput
                  label={
                    <label>
                      {t('common.secretKey')}
                      <Popup
                        trigger={<span className='fe-connectivity-webhook-help'>?</span>}
                        position={{ vertical: 'center', horizontal: 'right' }}
                        action='hover'
                        content={
                          <div className='fe-connectivity-webhook-help-block'>{t('connectivity.secretKeyHelp')}</div>
                        }
                      />
                    </label>
                  }
                  name='secret'
                  placeholder='Secret key'
                />
                <Grid container justifyContent='space-between'>
                  <Grid>
                    <FButton type='submit' variant='primary' loading={isSubmitting}>{
                      data ? t('connectivity.updateHook').toUpperCase() :
                        t('connectivity.addHook').toUpperCase()
                    }</FButton>
                  </Grid>
                  <Grid>
                    <Button
                      variant={testResult?.status === 'failed' ? 'danger' : undefined}
                      loading={isTesting}
                      onClick={() => dispatch(connectivityActions.postWebhookTestAction({ secret, url }))}
                    >
                      {testResult?.status.toUpperCase() ?? t('connectivity.testHook').toUpperCase()}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className='fe-connectivity-webhook-settings' xs={6}>
                <h2>{t('connectivity.eventSettings')}</h2>
                <div className='fe-connectivity-webhook-settings__frame'>
                  <h3>{t('connectivity.selectEvents')}</h3>
                  <SelectWebhook cleanCategory={cleanCategory} />
                  <h3>{t('connectivity.manageCategories')}</h3>
                  <AccordingCategories cleanCategory={cleanCategory} />
                </div>
              </Grid>
            </Grid>
          </FFormik.Form>
        )}
      </FFormik.Formik>
      <Dialog
        className={`fe-connectivity-webhook-dialog-${testResult?.status || ''}`}
        open={!!testResult?.message}
        onClose={() => dispatch(connectivityActions.cleanWebhookTestMessage())}
      >
        <pre>{testResult?.message}</pre>
      </Dialog>
    </>
  );
};
