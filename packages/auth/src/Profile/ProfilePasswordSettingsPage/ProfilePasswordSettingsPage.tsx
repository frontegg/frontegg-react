import React, { FC, useEffect, useRef, useState } from 'react';
import {
  FFormik,
  FForm,
  FInput,
  useT,
  validateSchema,
  validatePassword,
  validatePasswordConfirmation,
  FButton,
  ErrorMessage,
  PageTabProps,
  OnError,
} from '@frontegg/react-core';
import { useAuth } from '../../hooks';
import { FormikProps } from 'formik/dist/types';

const { Formik } = FFormik;

type ProfilePasswordSettingsPageProps = OnError;

export const ProfilePasswordSettingsPage: FC<ProfilePasswordSettingsPageProps> & PageTabProps = (props) => {
  const { t } = useT();
  const { onError } = props;
  const { loading, error, changePassword } = useAuth((state) => state.profileState);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const changePasswordSubmitted = useRef(false);

  useEffect(() => {
    if (changePasswordSubmitted.current && !loading && !error) {
      setSuccessMessage(t('auth.profile.password-settings.success-message'));
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  }, [loading, error]);

  return (
    <div className='fe-profile-password-page'>
      <div className='fe-section-title fe-bold fe-mb-4'>{t('common.password')}</div>
      <Formik
        initialValues={{
          password: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validationSchema={validateSchema({
          password: validatePassword(t),
          newPassword: validatePassword(t),
          confirmNewPassword: validatePasswordConfirmation(t, 'newPassword'),
        })}
        onSubmit={async ({ password, newPassword }, { resetForm }) => {
          changePasswordSubmitted.current = true;
          changePassword({ password, newPassword });
          resetForm();
        }}
      >
        <FForm>
          <div className='fe-row'>
            <FInput
              className='fe-input__inline'
              type='password'
              name='password'
              label={'Current Password'}
              data-test-id='currentpass'
            />
          </div>
          <div className='fe-row'>
            <FInput
              className='fe-input__inline'
              type='password'
              name='newPassword'
              label={'New Password'}
              data-test-id='newpass'
            />
            <FInput
              className='fe-input__inline'
              type='password'
              name='confirmNewPassword'
              label={'Repeat New Password'}
              data-test-id='repeatass'
            />
          </div>
          <ErrorMessage error={error} onError={onError} separator style={{ textAlign: 'left', marginBottom: '2rem' }} />
          <FButton type='submit' variant='primary' fullWidth={false} loading={loading} data-test-id='changepass-btn'>
            {successMessage || t('auth.profile.password-settings.button')}
          </FButton>
        </FForm>
      </Formik>
    </div>
  );
};

ProfilePasswordSettingsPage.Title = () => useT().t('auth.profile.password-settings.title');
ProfilePasswordSettingsPage.route = '/password';
