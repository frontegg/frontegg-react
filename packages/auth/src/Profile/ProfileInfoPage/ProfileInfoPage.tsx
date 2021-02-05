import React, { FC } from 'react';
import {
  PageTabProps,
  useT,
  FFormik,
  FForm,
  validateSchema,
  validateLength,
  validateEmail,
} from '@frontegg/react-core';
import { ProfileImageUploader } from './ProfileImageUploader';
import { ProfileBasicInformation } from './ProfileBasicInformation';
import { useProfileActions, useProfileState } from '../hooks';
import { IUserProfile } from '@frontegg/rest-api';

const { Formik } = FFormik;
export const ProfileInfoPage: FC & PageTabProps = (props) => {
  const { profile } = useProfileState();
  const { saveProfile } = useProfileActions();
  const { t } = useT();

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
        name: profile?.name ?? '',
        email: profile?.email ?? '',
      }}
      validationSchema={validateSchema({
        name: validateLength(t('common.name'), 2, t),
        email: validateEmail(t),
      })}
      enableReinitialize
      onSubmit={(values, { resetForm, setSubmitting }) => {
        saveProfile({
          ...values,
          callback: (profile: IUserProfile | null) => {
            setSubmitting(false);
            if (profile) {
              resetForm({
                isSubmitting: false,
                submitCount: 0,
                errors: {},
                touched: {},
                values: {
                  profilePictureUrl: profile?.profilePictureUrl ?? '',
                  name: profile?.name ?? '',
                  email: profile?.email ?? '',
                } as any,
              });
            }
          },
        });
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
