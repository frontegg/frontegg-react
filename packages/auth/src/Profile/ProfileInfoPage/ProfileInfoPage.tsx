import React, { FC, useCallback, useMemo } from 'react';
import {
  useT,
  FForm,
  FFormik,
  PageTabProps,
  validateEmail,
  validateSchema,
  validateLength,
} from '@frontegg/react-core';
import { ProfileImageUploader } from './ProfileImageUploader';
import { ProfileBasicInformation } from './ProfileBasicInformation';
import { useProfileActions, useProfileState } from '../hooks';

const { Formik } = FFormik;
export const ProfileInfoPage: FC & PageTabProps = ({ children }) => {
  const { profile } = useProfileState();
  const { saveProfile } = useProfileActions();
  const { t } = useT();

  const isChildrenExist = !!children;

  const initialValues = useMemo(
    () =>
      isChildrenExist
        ? {
            profilePictureUrl: profile?.profilePictureUrl ?? '',
            name: profile?.name ?? '',
            email: profile?.email ?? '',
          }
        : {
            name: profile?.name ?? '',
            email: profile?.email ?? '',
          },
    [profile, isChildrenExist]
  );

  const profilePhotoInitialValues = useMemo(
    () =>
      isChildrenExist
        ? {}
        : {
            profilePictureUrl: profile?.profilePictureUrl ?? '',
          },
    [profile, isChildrenExist]
  );

  const validationSchema = useMemo(
    () =>
      validateSchema({
        name: validateLength(t('common.name'), 2, t),
        email: validateEmail(t),
      }),
    [t]
  );

  const handlerSubmit = useCallback((values) => {
    saveProfile(values);
  }, []);

  return children ? (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handlerSubmit}
    >
      <FForm>
        <div className='fe-profile-info'>{children}</div>
      </FForm>
    </Formik>
  ) : (
    <div className='fe-profile-info'>
      <Formik initialValues={profilePhotoInitialValues} enableReinitialize onSubmit={handlerSubmit}>
        <FForm>
          <ProfileImageUploader />
        </FForm>
      </Formik>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handlerSubmit}
      >
        <FForm>
          <ProfileBasicInformation />
        </FForm>
      </Formik>
    </div>
  );
};

ProfileInfoPage.Title = () => useT().t('auth.profile.info.title');
ProfileInfoPage.route = '/';
