import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Grid,
  useT,
  Popup,
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
  validateArrayLength,
  Input,
} from '@frontegg/react-core';
import { initialValues } from './consts';
import { IWebhooksSaveData } from '@frontegg/rest-api';
import { AccordingCategories } from '../../elements/AccordingCategories';
import { SelectWebhook } from '../../elements/SelectWebhook';
import { filterCategories } from '../../utils';
import { IPluginState } from '../../interfaces';
import { connectivityActions } from '../../reducer';
import { ConnectivityWebhooksTestForm } from './ConnectivityWebhooksTestFrom';

export interface IConnectivityWebhooksForm {
  data: IWebhooksSaveData | null;
}

export const ConnectivityWebhooksForm: FC<IConnectivityWebhooksForm> = ({ data }) => {
  const { t } = useT();
  const dispatch = useDispatch();
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const { error, categories, channelMap, testResult, isSaving } = useSelector(
    ({ connectivity: { error, categories, channelMap, isTesting, testResult, isSaving } }: IPluginState) => ({
      error,
      isSaving,
      isTesting,
      categories,
      testResult,
      channelMap: channelMap && channelMap.webhook,
    })
  );
  useEffect(() => {
    return () => {
      dispatch(connectivityActions.cleanWebhookTestData());
    };
  }, [dispatch]);

  const toggleTestDialog = useCallback(() => {
    if (openTestDialog) {
      dispatch(connectivityActions.cleanWebhookTestMessage());
    }
    setOpenTestDialog(!openTestDialog);
  }, [setOpenTestDialog, openTestDialog]);

  const validationSchema = validateSchema({
    displayName: validateRequired(t('common.displayName'), t),
    url: validateUrl('URL', t),
    eventKeys: validateArrayLength(t, t('connectivity.events')),
  });

  const cleanCategory = filterCategories(categories, channelMap);

  return (
    <>
      <FFormik.Formik
        validationSchema={validationSchema}
        initialValues={{ ...initialValues, ...data, secret: data?.secret || '' }}
        onSubmit={(val, { setSubmitting }) => {
          dispatch(connectivityActions.cleanError());
          dispatch(
            connectivityActions.postDataAction({
              platform: 'webhook',
              data: { ...val, secret: val.secret ? val.secret : null },
            })
          );
          setSubmitting(false);
        }}
      >
        {({ values: { secret, url } }) => (
          <FFormik.Form>
            <Grid container wrap='nowrap'>
              <Grid item className='fe-connectivity-webhook-settings' xs={6}>
                <div className='fe-section-title fe-bold fe-mb-3'>{t('connectivity.generalSettings')}</div>
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
                    <FButton type='submit' variant='primary' loading={isSaving}>
                      {data ? t('connectivity.updateHook').toUpperCase() : t('connectivity.addHook').toUpperCase()}
                    </FButton>
                  </Grid>
                  <Grid>
                    <Button size='large' onClick={toggleTestDialog}>
                      {t('connectivity.testHook').toUpperCase()}
                    </Button>
                  </Grid>
                  {error && (
                    <Grid xs={12} className='fe-error-message'>
                      {error}
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item className='fe-connectivity-webhook-settings' xs={6}>
                <div className='fe-section-title fe-bold fe-mb-2'>{t('connectivity.eventSettings')}</div>
                <div className='fe-connectivity-webhook-settings__frame'>
                  <div className='fe-connectivity-webhook-settings__frame-title'>{t('connectivity.selectEvents')}</div>
                  <SelectWebhook cleanCategory={cleanCategory} />
                  <div className='fe-connectivity-webhook-settings__frame-title fe-mt-2'>
                    {t('connectivity.manageCategories')}
                  </div>
                  <AccordingCategories cleanCategory={cleanCategory} />
                </div>
              </Grid>
            </Grid>
          </FFormik.Form>
        )}
      </FFormik.Formik>
      <Dialog
        header={t('connectivity.testHook')}
        className={`fe-connectivity-webhook-dialog-${testResult?.status ?? ''}`}
        open={openTestDialog}
        onClose={toggleTestDialog}
      >
        <ConnectivityWebhooksTestForm
          toggleTestDialog={toggleTestDialog}
          secret={data?.secret ?? ''}
          url={data?.url ?? ''}
        />
      </Dialog>
    </>
  );
};
