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
import { integrationsActions } from '../../reducer';

export interface IIntegrationsWebhooksForm {
  data: IWebhooksSaveData | null;
}

export const IntegrationsWebhooksForm: FC<IIntegrationsWebhooksForm> = ({ data }) => {
  const { t } = useT();
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

  const validationSchema = validateSchema({
    displayName: validateRequired(t('common.displayName'), t),
    url: validateUrl('URL', t),
    secret: validateLength(t('common.secretKey'), 8, t),
    eventKeys: validateArrayLength(t, t('integrations.events')),
  });

  const cleanCategory = filterCategories(categories, channelMap);

  return (
    <>
      <FFormik.Formik
        validationSchema={validationSchema}
        initialValues={{ ...initialValues, ...data }}
        onSubmit={(val) => {
          dispatch(integrationsActions.postDataAction('webhook', val));
        }}
      >
        {({ values: { secret, url } }) => (
          <FFormik.Form>
            <Grid container wrap='nowrap'>
              <Grid item className='fe-integrations-webhook-settings' xs={6}>
                <h2>{t('integrations.generalSettings')}</h2>
                <FInput label={t('common.displayName')} name='displayName' placeholder={t('integrations.inputName')} />
                <FInput
                  label={t('common.description')}
                  name='description'
                  multiline
                  placeholder={t('integrations.shortDescription')}
                />
                <FInput label='URL' name='url' placeholder='https://' />
                <FInput
                  label={
                    <>
                      {t('common.secretKey')}
                      <Popup
                        trigger={<span className='fe-integrations-webhook-help'>?</span>}
                        position={{ vertical: 'center', horizontal: 'right' }}
                        action='hover'
                        content={
                          <div className='fe-integrations-webhook-help-block'>{t('integrations.secretKeyHelp')}</div>
                        }
                      />
                    </>
                  }
                  name='secret'
                  placeholder='Secret key'
                />
                <Grid container justifyContent='space-between'>
                  <Grid>
                    <FButton type='submit'>{t('integrations.updateHook').toUpperCase()}</FButton>
                  </Grid>
                  <Grid>
                    <Button
                      loading={isTesting}
                      onClick={() => dispatch(integrationsActions.postWebhookTestAction({ secret, url }))}
                    >
                      {testResult?.status.toUpperCase() ?? t('integrations.testHook').toUpperCase()}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className='fe-integrations-webhook-settings' xs={6}>
                <h2>{t('integrations.eventSettings')}</h2>
                <div className='fe-integrations-webhook-settings__frame'>
                  <h3>{t('integrations.selectEvents')}</h3>
                  <SelectWebhook cleanCategory={cleanCategory} />
                  <h3>{t('integrations.manageCategories')}</h3>
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
