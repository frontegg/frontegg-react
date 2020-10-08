import React, { FC, useCallback, useRef } from 'react';
import { useAuthProfile } from '../helpers';
import {
  FFormik,
  Button,
  Icon,
  Input,
  Loader,
  useT,
  FInput,
  FFileInput,
  OnError,
  ErrorMessage,
} from '@frontegg/react-core';

const { useFormikContext, useField } = FFormik;

const profilePictureUrl = 'profilePictureUrl';
// const getProfileImageInput = () => document.querySelector<HTMLInputElement>(`input[name=${profilePictureUrl}]`);
export const ProfileImageUploader: FC<OnError> = (props) => {
  const { loading, profile } = useAuthProfile();

  const [profileImageField] = useField(profilePictureUrl);
  const { errors, setErrors } = useFormikContext<any>();
  // const profileImageError = errors[profileImageField.name];
  //
  // const handleUploadClick = useCallback(() => {
  //   getProfileImageInput()?.click?.();
  // }, []);
  //
  // const handleRemoveImage = useCallback(() => {
  //   profileImageField.onChange(profileImageField.name)('');
  //   delete errors[profileImageField.name];
  //   setErrors(errors);
  //   const input = getProfileImageInput();
  //   input && (input.value = '');
  // }, [profileImageField]);

  const children = loading ? (
    <Loader center />
  ) : (
    <>
      <div className='fe-profile-image-container'>
        {profileImageField.value || profile?.profilePictureUrl ? (
          <img alt='Profile Image' src={profileImageField.value ?? profile?.profilePictureUrl ?? ''} />
        ) : (
          <Icon name='image' />
        )}
        {/*{profileImageField.value && (*/}
        {/*  <Icon onClick={handleRemoveImage} className='fe-profile-image-remove' name='delete' />*/}
        {/*)}*/}
      </div>
      <div className='fe-profile-image-details'>
        <div className='fe-profile-name'>{profile?.name}</div>
        {/*<FFileInput name={profilePictureUrl} accept='image/png, image/jpeg' />*/}
        {/*<Button variant='primary' onClick={handleUploadClick} fullWidth={false}>*/}
        {/*  {t('auth.profile.info.upload-photo')}*/}
        {/*</Button>*/}
        {/*{profileImageError ? (*/}
        {/*  <ErrorMessage error={profileImageError} onError={props.onError} />*/}
        {/*) : (*/}
        {/*  <div className='fe-profile-image-note'>{t('auth.profile.info.upload-photo-note')}</div>*/}
        {/*)}*/}
        <div className='fe-profile-image-note'>{profile?.email ?? ''}</div>
      </div>
    </>
  );
  return (
    <div className='fe-profile-image-uploader fe-card-container'>
      <div className='fe-card-content'>{children}</div>
    </div>
  );
};
