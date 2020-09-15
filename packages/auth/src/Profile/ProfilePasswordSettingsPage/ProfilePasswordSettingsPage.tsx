import React from 'react';
import { ProfilePage } from '../interfaces';
import { Form, Input, useT } from '@frontegg/react-core';

export const ProfilePasswordSettingsPage: ProfilePage = (props) => {
  const { t } = useT();
  return (
    <div className='fe-profile-password-page'>
      <div className='fe-section-title fe-bold fe-mb-2'>{t('common.password')}</div>

      <Form>
        <Input inForm label={'Current Password'} fullWidth={false} />
        <Input inForm label={'New Password'} fullWidth={false} />
        <Input inForm label={'Repeat New Password'} fullWidth={false} />
      </Form>
    </div>
  );
};

ProfilePasswordSettingsPage.Title = () => useT().t('auth.profile.password-settings.title');
ProfilePasswordSettingsPage.route = '/password';
