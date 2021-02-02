import React, { FC, useEffect } from 'react';
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
  validateSchema,
  validateObject,
  Input,
  ErrorMessage,
} from '@frontegg/react-core';
import { connectivityActions } from '../../reducer';
import { IPluginState } from '../../interfaces';

export interface IConnectivityWebhookTestForm {
  secret: string;
  url: string;
  toggleTestDialog: () => void;
}

export const ConnectivityWebhooksTestForm: FC<IConnectivityWebhookTestForm> = ({ secret, url, toggleTestDialog }) => {
  const { t } = useT();
  const dispatch = useDispatch();
  const { isTesting, testResult } = useSelector(({ connectivity: { isTesting, testResult } }: IPluginState) => ({
    isTesting,
    testResult,
  }));

  useEffect(() => {
    return () => {
      dispatch(connectivityActions.cleanWebhookTestData());
    };
  }, [dispatch]);

  const validationSchema = validateSchema({
    payload: validateObject(t('common.payload'), t),
  });

  return (
    <FFormik.Formik
      validationSchema={validationSchema}
      initialValues={{ payload: '' }}
      onSubmit={({ payload }, { setSubmitting }) => {
        dispatch(
          connectivityActions.postWebhookTestAction({
            url,
            secret: secret ? secret : null,
            payload: { ...JSON.parse(payload) },
          })
        );
        setSubmitting(false);
      }}
    >
      <FFormik.Form>
        <Grid container wrap='nowrap'>
          <Grid container className='fe-connectivity-webhook-test-settings' direction='column' xs={12}>
            <Input className='fe-mb-1' label='URL' placeholder='https://' value={url} disabled />
            <Input
              className='fe-mb-1'
              label={t('common.secretKey')}
              placeholder={t('common.secretKey')}
              value={secret}
              disabled
            />
            <FInput
              className='fe-connectivity-webhook-test-payload'
              label={t('connectivity.json')}
              name='payload'
              multiline
              placeholder={t('connectivity.json')}
            />
          </Grid>
        </Grid>

        {testResult?.status === 'failed' && <ErrorMessage error={testResult.message} />}
        {testResult?.status === 'success' && <div className='fe-success-message fe-center'>{testResult.message}</div>}

        <div className='fe-dialog__footer'>
          <Grid container justifyContent='space-between'>
            <Grid>
              <Button onClick={toggleTestDialog} size='large'>
                {t('common.close')}
              </Button>
            </Grid>
            <Grid>
              <FButton
                size='large'
                variant={testResult?.status === 'failed' ? 'danger' : undefined}
                loading={isTesting}
                type='submit'
              >
                {testResult?.status?.toUpperCase() ?? t('connectivity.testHook').toUpperCase()}
              </FButton>
            </Grid>
          </Grid>
        </div>
      </FFormik.Form>
    </FFormik.Formik>
  );
};
