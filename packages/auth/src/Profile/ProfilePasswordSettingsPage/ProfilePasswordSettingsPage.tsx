import React from 'react';
import {
  FFormik,
  FForm,
  FInput,
  useT,
  validateSchema,
  validatePassword,
  validatePasswordConfirmation,
  FButton,
  PageProps,
} from '@frontegg/react-core';
import { useAuth } from '../../hooks';

const { Formik } = FFormik;
export const ProfilePasswordSettingsPage: PageProps = () => {
  const { t } = useT();
  const {} = useAuth();
  return (
    <div className='fe-profile-password-page'>
      <div className='fe-section-title fe-bold fe-mb-2'>{t('common.password')}</div>
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
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        <FForm>
          <div className='fe-row'>
            <FInput className='fe-input__inline' type='password' name='password' label={'Current Password'} />
          </div>
          <div className='fe-row'>
            <FInput className='fe-input__inline' type='password' name='newPassword' label={'New Password'} />
            <FInput
              className='fe-input__inline'
              type='password'
              name='confirmNewPassword'
              label={'Repeat New Password'}
            />
          </div>
          <FButton type='submit' variant='primary' fullWidth={false}>
            {t('auth.profile.password-settings.button')}
          </FButton>
        </FForm>
      </Formik>
    </div>
  );
};

ProfilePasswordSettingsPage.Title = () => useT().t('auth.profile.password-settings.title');
ProfilePasswordSettingsPage.route = '/password';
