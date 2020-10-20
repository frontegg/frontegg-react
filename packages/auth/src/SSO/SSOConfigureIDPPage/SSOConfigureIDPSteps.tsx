import React, { FC, useEffect, useState } from 'react';
import { Button, ErrorMessage, FInput, Grid, Icon, Input, SwitchToggle, useT } from '@frontegg/react-core';
import { useAuth } from '../../hooks';
import Dropzone from 'react-dropzone';
import { IInitialValues } from './SSOConfigureIDPForm';
import { FFormik } from '@frontegg/react-core';

export interface SSOConfigureIDPStepProps {
  goToStep: (step: number) => void;
}

export interface SSOAutomaticConfig {
  configFile: File[];
  setConfigFile: (file: File[]) => void;
}

export const SSOConfigureIDPStep1: FC<SSOConfigureIDPStepProps> = (props) => {
  const { t } = useT();
  const { samlConfiguration } = useAuth((state) => state.ssoState);
  const validCallback = samlConfiguration?.acsUrl && samlConfiguration?.spEntityId;
  return (
    <div className='fe-sso-idp-page__step'>
      {validCallback ? (
        <>
          <Input size='large' readOnly inForm fullWidth label='ASC URL' value={samlConfiguration?.acsUrl} />
          <Input size='large' readOnly inForm fullWidth label='Entity ID' value={samlConfiguration?.spEntityId} />
        </>
      ) : (
        <ErrorMessage error={'Ask your vendor to configure SSO before!'} />
      )}

      <div className='fe-flex-spacer' />

      <Grid container>
        <Grid item xs style={{ textAlign: 'end' }}>
          <Button disabled={!validCallback} size='large' variant='primary' onClick={() => props.goToStep(2)}>
            {t('common.next')} <Icon className='fe-ml-1' name={'right-arrow'} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const SSOAutomaticConfig: FC<SSOAutomaticConfig> = ({ setConfigFile, configFile }) => {
  const { t } = useT();

  return (
    <>
      {configFile.length ? (
        configFile[0].name
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

const SSOManualConfig = () => {
  return (
    <>
      <FInput name='ssoEndpoint' label='SSO Endpoint' placeholder='URL from the SSO' />
      <FInput name='publicCertificate' label='Public Certificate' placeholder='Provide Public Certificate' multiline />
    </>
  );
};

export const SSOConfigureIDPStep2: FC<SSOConfigureIDPStepProps> = (props) => {
  const { t } = useT();
  const { useFormikContext } = FFormik;
  const { values, setFieldValue } = useFormikContext<IInitialValues>();
  const [configFile, setConfigFile] = useState<File[]>([]);
  const { configSaml } = values;

  useEffect(() => {
    setFieldValue('configFile', configFile);
  }, [configFile]);

  return (
    <div className='fe-sso-idp-page__step'>
      <SwitchToggle
        value={configSaml === 'auto' ? false : true}
        onChange={(e) => setFieldValue('configSaml', e ? 'manual' : 'auto')}
        labels={['Automatic', 'Manual']}
      />

      {configSaml === 'auto' ? (
        <SSOAutomaticConfig configFile={configFile} setConfigFile={setConfigFile} />
      ) : (
        <SSOManualConfig />
      )}

      <div className='fe-flex-spacer' />
      <Grid container justifyContent={'space-between'}>
        <Grid item xs>
          <Button size='large' onClick={() => props.goToStep(1)}>
            <Icon className='fe-mr-1' name={'left-arrow'} /> {t('common.back')}
          </Button>
        </Grid>
        <Grid item xs style={{ textAlign: 'end' }}>
          <Button size='large' variant='primary' type='submit'>
            {t('common.validate')}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
