import React, { FC, useState } from 'react';
import { Button, ErrorMessage, FInput, Grid, Icon, Input, SwitchToggle, useT } from '@frontegg/react-core';
import { useAuth } from '../../hooks';

export interface SSOConfigureIDPStepProps {
  goToStep: (step: number) => void;
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

const SSOAutomaticConfig = () => {
  return <></>;
};
const SSOManualConfig = () => {
  return (
    <>
      <Input label='SSO Endpoint' placeholder='URL from the SSO' />
      <Input label='Public Certificate' placeholder='Provide Public Certificate' multiline />
    </>
  );
};

export const SSOConfigureIDPStep2: FC<SSOConfigureIDPStepProps> = (props) => {
  const { t } = useT();
  const [configType, setConfigType] = useState(false);

  return (
    <div className='fe-sso-idp-page__step'>
      <SwitchToggle value={configType} onChange={setConfigType} labels={['Manual', 'Automatic']} />

      {configType ? <SSOAutomaticConfig /> : <SSOManualConfig />}

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
