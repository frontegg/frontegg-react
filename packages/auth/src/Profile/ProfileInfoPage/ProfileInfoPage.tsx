import React, { FC } from 'react';
import { PageTabProps, useT, FFormik, IUserProfile, FForm } from '@frontegg/react-core';
import { ProfileImageUploader } from './ProfileImageUploader';
import { ProfileBasicInformation } from './ProfileBasicInformation';
import { useAuthProfile } from '../helpers';
import { useAuth } from '../../hooks';

const { Formik } = FFormik;
export const ProfileInfoPage: FC & PageTabProps = (props) => {
  const { loading, profile, saveProfile } = useAuthProfile();

  const children = props.children ?? (
    <>
      <ProfileImageUploader />
      <ProfileBasicInformation />
    </>
  );

  return (
    <Formik
      initialValues={{
        profilePictureUrl: profile?.profilePictureUrl ?? '',
      }}
      enableReinitialize
      onSubmit={(values) => {
        saveProfile(values);
      }}
    >
      <FForm>
        <div className='fe-profile-info'>{children}</div>
      </FForm>
    </Formik>
  );
};

ProfileInfoPage.Title = () => useT().t('auth.profile.info.title');
ProfileInfoPage.route = '/';
