import React, { FC, useCallback } from 'react';
import { useProfileActions, useProfileState } from '../hooks';
import { FFormik, Button, Icon, Loader, useT, FFileInput, OnError, ErrorMessage } from '@frontegg/react-core';

const { useFormikContext, useField } = FFormik;

const profilePictureUrl = 'profilePictureUrl';

const getProfileImageInput = () => document.querySelector<HTMLInputElement>(`input[name=${profilePictureUrl}]`);

export const ProfileImageUploader: FC<OnError> = (props) => {
  const { loading, profile, error } = useProfileState();
  const { setProfileState } = useProfileActions();
  const { t } = useT();
  const { errors, setErrors } = useFormikContext<any>();

  const [profileImageField] = useField(profilePictureUrl);
  const profileImageError = error || errors[profileImageField.name];

  const handleUploadClick = useCallback(() => {
    getProfileImageInput()?.click?.();
  }, []);

  const handleRemoveImage = useCallback(() => {
    profileImageField.onChange(profileImageField.name)(profile?.profilePictureUrl ?? '');
    delete errors[profileImageField.name];
    setErrors(errors);
    const input = getProfileImageInput();
    setProfileState({ error: undefined });
    input && (input.value = '');
  }, [profileImageField]);

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
        {profileImageField.value !== profile?.profilePictureUrl && (
          <Icon onClick={handleRemoveImage} className='fe-profile-image-remove' name='delete' />
        )}
      </div>
      <div className='fe-profile-image-details'>
        <div className='fe-profile-name'>{profile?.name}</div>
        <div className='fe-profile-email'>{profile?.email ?? ''}</div>

        <FFileInput name={profilePictureUrl} accept='image/png, image/jpeg' />
        <Button variant='primary' onClick={handleUploadClick} fullWidth={false} data-test-id='uploadPhoto-btn'>
          {t('auth.profile.info.upload-photo')}
        </Button>
        {profileImageError && <ErrorMessage error={profileImageError} onError={props.onError} />}
      </div>
    </>
  );
  return (
    <div className='fe-profile-image-uploader fe-card-container'>
      <div className='fe-card-content'>{children}</div>
    </div>
  );
};
