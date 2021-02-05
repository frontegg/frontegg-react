import React, { FC } from 'react';
import { FButton, FInput, Grid, useT, FFormik } from '@frontegg/react-core';
import { useProfileState } from '../hooks';

export const ProfileBasicInformation: FC = () => {
  const { t } = useT();
  const { saving } = useProfileState();

  return (
    <div className='fe-profile-basic-information'>
      <div className='fe-section-title fe-bold fe-mb-2'>{t('auth.profile.info.title2')}</div>
      <Grid container spacing={1}>
        <Grid item xs>
          <FInput name='name' label={t('auth.profile.info.user-name')} data-test-id='fill-name' />
        </Grid>
        <Grid item xs>
          <FInput name='email' label={t('common.email')} disabled data-test-id='fill-email' />
        </Grid>
        <Grid item xs={12}>
          <FButton variant='primary' type='submit' fullWidth={false} loading={saving} data-test-id='updateinfo-btn'>
            Update Profile
          </FButton>
        </Grid>
      </Grid>
    </div>
  );
};
