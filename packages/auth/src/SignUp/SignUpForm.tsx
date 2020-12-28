import React, { FC, useCallback } from 'react';
import {
  FButton,
  FForm,
  FFormik,
  FInput,
  useT,
  validateLength,
  validateSchema,
  validateEmail,
} from '@frontegg/react-core';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';

const { Formik } = FFormik;

export interface SignUpFormProps {
  withCompanyName?: boolean;
}

const stateMapper = ({ signUpState, onRedirectTo, routes }: AuthState) => ({ onRedirectTo, routes, ...signUpState });

export const SignUpForm: FC<SignUpFormProps> = ({ withCompanyName = true }) => {
  const { t } = useT();

  const { signUpUser, loading, routes, onRedirectTo } = useAuth(stateMapper);

  const redirectToLogin = useCallback(() => {
    onRedirectTo(routes.loginUrl);
  }, []);

  return (
    <>
      <div>
        {t('auth.sign-up.suggest-login.message')}
        <span onClick={redirectToLogin} className={'fe-sign-up__back-to-login-link'}>
          {t('auth.sign-up.suggest-login.login-link')}
        </span>
      </div>

      <Formik
        initialValues={{
          email: '',
          name: '',
          companyName: '',
        }}
        onSubmit={(values) => {
          if (withCompanyName) {
            signUpUser(values);
          } else {
            signUpUser({ ...values, companyName: values.name });
          }
        }}
        validationSchema={validateSchema({
          email: validateEmail(t),
          name: validateLength('name', 3, t),
          companyName: withCompanyName && validateLength('Company Name', 3, t),
        })}
      >
        <FForm>
          <FInput name='name' size='large' placeholder={t('auth.sign-up.form.name')} />
          <FInput name='email' type={'email'} size='large' placeholder={t('auth.sign-up.form.email')} />
          {withCompanyName && (
            <FInput name='companyName' size='large' placeholder={t('auth.sign-up.form.company-name')} />
          )}

          <FButton type='submit' fullWidth variant='primary' loading={loading}>
            {t('auth.sign-up.form.submit-button')}
          </FButton>
        </FForm>
      </Formik>
    </>
  );
};
