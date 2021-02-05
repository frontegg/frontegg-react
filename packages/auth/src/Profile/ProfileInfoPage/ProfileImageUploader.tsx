import React, { ChangeEvent, FC, useCallback, useRef } from 'react';
import { useAuthProfile } from '../helpers';
import { FFormik, Button, Icon, Loader, useT, FFileInput, OnError, ErrorMessage } from '@frontegg/react-core';

const { useFormikContext, useField } = FFormik;

const profilePictureUrl = 'profilePictureUrl';

// const getImageDimension = (file: File) =>
//   new Promise<{ width: number; height: number }>((resolve, reject) => {
//     const img = new Image();
//     const objectUrl = URL.createObjectURL(file);
//     img.onload = () => {
//       const result = { width: img.width, height: img.height };
//       URL.revokeObjectURL(objectUrl);
//       resolve(result);
//     };
//     img.onerror = () => {
//       const result = { width: 0, height: 0 };
//       URL.revokeObjectURL(objectUrl);
//       resolve(result);
//     };
//
//     img.src = objectUrl;
//   });

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

  // const validateProfileImage = async (file: File) => {
  //   // const { width, height } = await getImageDimension(file);
  //   // if (width > 512 || height > 512) {
  //   //   return t('auth.profile.info.invalid-profile-photo');
  //   // }
  //   return null;
  // };

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
