import React from 'react';
import { PageProps, useT } from '@frontegg/react-core';
import { useAuthProfile } from '../helpers';

export const ProfileInfoPage: PageProps = () => {
  const { loading, error, profile } = useAuthProfile();

  return (
    <div className='fe-profile-info'>

      <br />
      <br />
      Loading: {loading ? 'true' : 'false'}
      <br />
      <br />
      Error: {error || 'null'}
      <br />
      <br />
      {profile && JSON.stringify(profile)}
    </div>
  );
};

ProfileInfoPage.Title = () => useT().t('auth.profile.info.title');
ProfileInfoPage.route = '/';
