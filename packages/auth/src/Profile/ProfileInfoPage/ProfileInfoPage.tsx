import React from 'react';
import { useT } from '@frontegg/react-core';
import { ProfilePage } from '../interfaces';
import { useAuthProfile } from '../helpers';

export const ProfileInfoPage: ProfilePage = (props) => {
  const { profile } = useAuthProfile();

  return (
    <div className='fe-profile-info'>
      profile info
      {JSON.stringify(profile ?? {})}
    </div>
  );
};

ProfileInfoPage.Title = () => useT().t('auth.profile.info.title');
ProfileInfoPage.route = '/';
