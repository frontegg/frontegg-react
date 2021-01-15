import React, { FC, useEffect, useMemo } from 'react';
import { Button, ErrorMessage, FButton, FInput, Grid, Icon, Input, SwitchToggle, useT } from '@frontegg/react-core';
import Dropzone from 'react-dropzone';
import { FFormik } from '@frontegg/react-core';
import { useAuthSSOState } from '../hooks';
import { SamlVendors } from './SSOVendors';

const { useField, useFormikContext } = FFormik;

export interface SSOConfigureIDPStepProps {
  goToStep: (step: number) => void;
  samlVendor: SamlVendors;
}

export interface SSOManualConfigProps extends Pick<SSOConfigureIDPStepProps, 'samlVendor'> {}

export const SSOConfigureIDPStep1: FC<SSOConfigureIDPStepProps> = ({ goToStep, samlVendor }) => {
  const { t } = useT();
  const { samlConfiguration } = useAuthSSOState(({ samlConfiguration }) => ({ samlConfiguration }));

  const validCallback = samlConfiguration?.acsUrl && samlConfiguration?.spEntityId;
  return (
    <div className='fe-sso-idp-page__step'>
      {validCallback ? (
        <>
          <Input
            size='large'
            readOnly
            inForm
            fullWidth
            label='ASC URL'
            value={samlConfiguration?.acsUrl}
            data-test-id='ASCURL-box'
          />
          {samlVendor !== 'Oidc' && (
            <Input
              size='large'
              readOnly
              inForm
              fullWidth
              label='Entity ID'
              value={samlConfiguration?.spEntityId}
              data-test-id='EntityID-box'
            />
          )}
        </>
      ) : (
        <ErrorMessage error={t('auth.sso.idp.error-ask-your-vendor')} />
      )}

      <div className='fe-flex-spacer' />

      <Grid container>
        <Grid item xs style={{ textAlign: 'end' }}>
          <Button
            disabled={!validCallback}
            size='large'
            variant='primary'
            onClick={() => goToStep(2)}
            data-test-id='rightArrow-btn'
          >
            {t('common.next')} <Icon className='fe-ml-1' name={'right-arrow'} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const SSOAutomaticConfig: FC = () => {
  const { t } = useT();
  const { useField } = FFormik;
  const [{ value: configFile }, , { setValue: setConfigFile }] = useField('configFile');

  return (
    <>
      {configFile?.length ? (
        <>
          <div className='fe-sso-dnd-title'>{t('auth.dropzone.title')}</div>
          <section className='fe-sso-dnd'>
            <div className='fe-sso-dnd-container'>{configFile[0].name}</div>
          </section>
        </>
      ) : (
        <>
          <div className='fe-sso-dnd-title'>{t('auth.dropzone.title')}</div>
          <Dropzone onDrop={(acceptedFiles) => setConfigFile(acceptedFiles)} accept='text/xml'>
            {({ getRootProps, getInputProps }) => (
              <section className='fe-sso-dnd'>
                <div className='fe-sso-dnd-container'>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className='fe-bold'>{t('auth.dropzone.dnd')}</div>
                    <p>{t('auth.dropzone.description')}</p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </>
      )}
    </>
  );
};

const SSOManualConfig: FC<SSOManualConfigProps> = ({ samlVendor }) => {
  const { t } = useT();
  if (samlVendor === 'Oidc') {
    return (
      <div className='sso-endpoint-container'>
        <FInput name='oidcClientId' label='Client Id' placeholder={t('common.clientId')} />
        <FInput name='oidcSecret' label='Secret key' placeholder={t('common.secretKey')} multiline />
      </div>
    );
  }
  return (
    <div className='sso-endpoint-container'>
      <FInput
        name='ssoEndpoint'
        label={t('auth.sso.idp.form.endpoint')}
        placeholder={t('auth.sso.idp.form.endpoint-desc')}
      />
      <FInput
        name='publicCertificate'
        label={t('auth.sso.idp.form.certificate')}
        placeholder={t('auth.sso.idp.form.certificate-desc')}
        multiline
      />
    </div>
  );
};

export const SSOConfigureIDPStep2: FC<SSOConfigureIDPStepProps> = ({ goToStep, samlVendor }) => {
  const { t } = useT();

  const [{ value: configSaml }, , { setValue: setConfigSaml }] = useField<string>('configSaml');
  const { isValid, dirty } = useFormikContext();

  const { samlConfiguration, saving, error } = useAuthSSOState(({ samlConfiguration, saving, error }) => ({
    samlConfiguration,
    saving,
    error,
  }));

  useEffect(() => {
    samlVendor === 'Oidc' ? setConfigSaml('manual') : null;
  }, [samlVendor]);

  const isDomainValidated = samlConfiguration?.validated ?? false;
  const isIdpValidated = useMemo(
    () =>
      samlVendor === 'Oidc'
        ? !!(samlConfiguration?.oidcClientId && isDomainValidated)
        : !!(samlConfiguration?.ssoEndpoint && isDomainValidated),
    [samlVendor]
  );

  return (
    <div className='fe-sso-idp-page__step'>
      <SwitchToggle
        disabled={samlVendor === 'Oidc'}
        value={configSaml !== 'auto'}
        onChange={(toggle) => setConfigSaml(toggle ? 'manual' : 'auto')}
        labels={[t('common.automatic'), t('common.manual')]}
      />

      {configSaml === 'auto' ? <SSOAutomaticConfig /> : <SSOManualConfig samlVendor={samlVendor} />}
      <ErrorMessage error={error} separator />
      <div className='fe-flex-spacer' />
      <Grid container>
        <Grid item xs>
          <Button isCancel size='large' onClick={() => goToStep(1)}>
            <Icon className='fe-mr-1' name={'left-arrow'} /> {t('common.back')}
          </Button>
        </Grid>
        <Grid item xs style={{ textAlign: 'end' }}>
          <FButton loading={!!saving} size='large' variant='primary' type='submit'>
            {isIdpValidated && !dirty && isValid && !saving ? t('common.configured') : t('common.configure')}
          </FButton>
        </Grid>
      </Grid>
    </div>
  );
};
