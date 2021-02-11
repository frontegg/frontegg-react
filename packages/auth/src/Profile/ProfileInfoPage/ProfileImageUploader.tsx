import React, { ChangeEvent, FC, useCallback, useRef } from 'react';
import { useAuthProfile } from '../helpers';
import { FFormik, Button, Icon, Loader, useT, FFileInput, OnError, ErrorMessage } from '@frontegg/react-core';

const { useFormikContext, useField } = FFormik;

const profilePictureUrl = 'profilePictureUrl';

const getProfileImageInput = () => document.querySelector<HTMLInputElement>(`input[name=${profilePictureUrl}]`);

export const ProfileImageUploader: FC<OnError> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { loading, profile, error, setProfileState } = useAuthProfile();
  const { t } = useT();
  const { errors, setErrors, submitForm, isSubmitting } = useFormikContext<any>();

  const [{ value: profilePhotoValue }, {}, { setValue: setProfileValue }] = useField(profilePictureUrl);
  const profileImageError = error || errors[profilePictureUrl];

  const handleUploadClick = useCallback(() => {
    inputRef.current?.click?.();
  }, [inputRef]);

  const handleRemoveImage = useCallback(() => {
    setProfileValue(profile?.profilePictureUrl ?? '');
    delete errors[profilePictureUrl];
    setErrors(errors);
    setProfileState({ error: undefined });
    inputRef.current && (inputRef.current.value = '');
  }, [errors, setErrors, setProfileState, setProfileValue, inputRef]);

  const handlerOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      !!e.target.value && submitForm();
    },
    [submitForm]
  );

  const children = loading ? (
    <Loader center />
  ) : (
    <>
      <div className='fe-profile-image-container'>
        {profilePhotoValue || profile?.profilePictureUrl ? (
          <img alt='Profile Image' src={profilePhotoValue ?? profile?.profilePictureUrl ?? ''} />
        ) : (
          <Icon name='image' />
        )}
      </div>
      <div className='fe-profile-image-details'>
        <div className='fe-profile-name'>{profile?.name}</div>
        <div className='fe-profile-email'>{profile?.email ?? ''}</div>

        <FFileInput name={profilePictureUrl} accept='image/png, image/jpeg' ref={inputRef} onChange={handlerOnChange} />
        <Button
          variant='primary'
          onClick={handleUploadClick}
          fullWidth={false}
          data-test-id='uploadPhoto-btn'
          loading={isSubmitting}
        >
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
