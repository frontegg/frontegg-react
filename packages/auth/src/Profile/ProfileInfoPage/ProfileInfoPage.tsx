import React from 'react';
import { PageProps, useT } from '@frontegg/react-core';
import { useAuthUser } from '../../hooks';

export const ProfileInfoPage: PageProps = (props) => {
  const profile = useAuthUser();

  return (
    <div className='fe-profile-info'>
      profile info
      {JSON.stringify(profile ?? {})}
    </div>
  );
};

ProfileInfoPage.Title = () => useT().t('auth.profile.info.title');
ProfileInfoPage.route = '/';
