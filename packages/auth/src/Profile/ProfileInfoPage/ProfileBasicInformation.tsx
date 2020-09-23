import React, { FC } from 'react';
import { FButton, FInput, useT } from '@frontegg/react-core';


export const ProfileBasicInformation: FC = (props) => {
  const { t } = useT();
  return <div className='fe-profile-basic-information'>
    <div className='fe-section-title fe-bold fe-mb-2'>{t('auth.profile.info.title2')}</div>
    <div className='fe-row'>
      <FInput name='title' label={t('auth.profile.info.user-title')} />
      <FInput name='name' label={t('auth.profile.info.user-name')} />
      <FInput name='email' label={t('common.email')} />
    </div>
    <div className='fe-row'>
      <FInput name='country' label={t('common.country')} />
      <FInput name='birthdate' label={t('common.date-of-birth')} />
    </div>
    <FButton variant='primary' type='submit' fullWidth={false}>Update Profile</FButton>
  </div>;
};
