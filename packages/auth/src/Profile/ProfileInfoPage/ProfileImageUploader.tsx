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

const getProfileImageInput = () => document.querySelector<HTMLInputElement>(`input[name=${profilePictureUrl}]`);

const getImageDimension = (file: File) =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const result = { width: img.width, height: img.height };
      URL.revokeObjectURL(objectUrl);
      resolve(result);
    };
    img.onerror = () => {
      const result = { width: 0, height: 0 };
      URL.revokeObjectURL(objectUrl);
      resolve(result);
    };

    img.src = objectUrl;
  });
export const ProfileImageUploader: FC<OnError> = (props) => {
  const { loading, profile, error, setProfileState } = useAuthProfile();
  const { t } = useT();
  const { errors, setErrors } = useFormikContext<any>();

  const [profileImageField] = useField(profilePictureUrl);
  const profileImageError = error || errors[profileImageField.name];

  const handleUploadClick = useCallback(() => {
    getProfileImageInput()?.click?.();
  }, []);

  const validateProfileImage = async (file: File) => {
    const { width, height } = await getImageDimension(file);
    if (width > 512 || height > 512) {
      return t('auth.profile.info.invalid-profile-photo');
    }
    return null;
  };

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

        <FFileInput name={profilePictureUrl} accept='image/png, image/jpeg' validation={validateProfileImage} />
        <Button variant='primary' onClick={handleUploadClick} fullWidth={false}>
          {t('auth.profile.info.upload-photo')}
        </Button>
        {profileImageError ? (
          <ErrorMessage error={profileImageError} onError={props.onError} />
        ) : (
          <div className='fe-profile-image-note'>{t('auth.profile.info.upload-photo-note')}</div>
        )}
      </div>
    </>
  );
  return (
    <div className='fe-profile-image-uploader fe-card-container'>
      <div className='fe-card-content'>{children}</div>
    </div>
  );
};
