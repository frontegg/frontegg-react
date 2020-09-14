import React from 'react';
import { ProfilePage } from '../interfaces';
import { useT } from '@frontegg/react-core';

export const ProfilePasswordSettingsPage: ProfilePage = (props) => {
  return <div>ProfilePasswordSettingsPage</div>;
};

ProfilePasswordSettingsPage.Title = () => useT().t('auth.profile.password-settings.title');
ProfilePasswordSettingsPage.route = '/password';
