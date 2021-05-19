import React, { ComponentType, FC, useCallback } from 'react';
import {
  FButton,
  FForm,
  FFormik,
  FInput,
  FCheckbox,
  useT,
  validateLength,
  validateSchema,
  validateEmail,
  ErrorMessage,
  validateCheckbox,
  validatePasswordUsingOWASP,
} from '@frontegg/react-core';
import {
  useAuthRoutes,
  useOnRedirectTo,
  useSecurityPolicyState,
  useSignUpActions,
  useSignUpState,
} from '@frontegg/react-hooks/auth';
import { FReCaptcha } from '../components/FReCaptcha';
import { SignUpCheckbox } from './SignUp';
import { SocialLoginActionWrapperProps } from '../SocialLogins';

const { Formik } = FFormik;

export interface SignUpFormProps {
  withCompanyName?: boolean;
  signUpConsent?: SignUpCheckbox;
  marketingMaterialConsent?: SignUpCheckbox;
  SocialLogins: ComponentType<SocialLoginActionWrapperProps>;
}

export const SignUpForm: FC<SignUpFormProps> = ({
  withCompanyName = true,
  signUpConsent,
  marketingMaterialConsent,
  SocialLogins,
}) => {
  const { t } = useT();

  const routes = useAuthRoutes();
  const onRedirectTo = useOnRedirectTo();
  const { signUpUser } = useSignUpActions();
  const { loading, error, allowNotVerifiedUsersLogin } = useSignUpState();
  const {
    passwordPolicy: { policy },
  } = useSecurityPolicyState();

  const getCheckboxDetails = useCallback((checkbox?: SignUpCheckbox) => {
    const isVisible = checkbox?.hasOwnProperty('content');
    const isRequired = isVisible && checkbox?.required !== false;

    return { isVisible, isRequired };
  }, []);

  const redirectToLogin = useCallback(() => {
    onRedirectTo(routes.loginUrl, { preserveQueryParams: true });
  }, []);

  const signUpConsentDetails = getCheckboxDetails(signUpConsent);
  const marketingMaterialConsentDetails = getCheckboxDetails(marketingMaterialConsent);

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
          recaptchaToken: '',
          acceptedTermsOfService: signUpConsentDetails.isVisible ? false : undefined,
          allowMarketingMaterial: marketingMaterialConsentDetails.isVisible ? false : undefined,
          password: allowNotVerifiedUsersLogin ? '' : undefined,
        }}
        onSubmit={({ acceptedTermsOfService, allowMarketingMaterial, ...values }) => {
          const metadata = JSON.stringify({
            acceptedTermsOfService,
            allowMarketingMaterial,
          });

          if (withCompanyName) {
            signUpUser({ ...values, metadata });
          } else {
            signUpUser({ ...values, companyName: values.name, metadata });
          }
        }}
        validationSchema={validateSchema({
          email: validateEmail(t),
          name: validateLength('name', 3, t),
          companyName: withCompanyName && validateLength('Company Name', 3, t),
          acceptedTermsOfService: signUpConsentDetails.isRequired && validateCheckbox(),
          allowMarketingMaterial: marketingMaterialConsentDetails.isRequired && validateCheckbox(),
          password: allowNotVerifiedUsersLogin && validatePasswordUsingOWASP(policy),
        })}
      >
        {({ values: { acceptedTermsOfService, allowMarketingMaterial } }) => {
          return (
            <FForm>
              <FInput name='name' size='large' placeholder={t('auth.sign-up.form.name')} data-test-id='name-box' />
              <FInput
                name='email'
                type={'email'}
                size='large'
                placeholder={t('auth.sign-up.form.email')}
                data-test-id='email-box'
              />
              {allowNotVerifiedUsersLogin && (
                <FInput
                  size='large'
                  type='password'
                  name='password'
                  tabIndex={allowNotVerifiedUsersLogin ? undefined : -1}
                  placeholder={t('auth.login.enter-your-password')}
                  data-testid='password-box'
                />
              )}
              {withCompanyName && (
                <FInput
                  name='companyName'
                  size='large'
                  placeholder={t('auth.sign-up.form.company-name')}
                  data-test-id='compenyName-box'
                />
              )}
              {signUpConsentDetails.isVisible && (
                <FCheckbox
                  name='acceptedTermsOfService'
                  renderLabel={signUpConsent?.content}
                  className={'fe-sign-up__checkbox'}
                />
              )}
              {marketingMaterialConsentDetails.isVisible && (
                <FCheckbox
                  name='allowMarketingMaterial'
                  renderLabel={marketingMaterialConsent?.content}
                  className={'fe-sign-up__checkbox'}
                />
              )}
              <FButton type='submit' fullWidth variant='primary' loading={loading} data-test-id='signupSubmit-btn'>
                {t('auth.sign-up.form.submit-button')}
              </FButton>
              <ErrorMessage error={error} />
              <FReCaptcha action='sign_up' />
              <SocialLogins
                disabled={
                  (marketingMaterialConsentDetails.isRequired && !allowMarketingMaterial) ||
                  (signUpConsentDetails.isRequired && !acceptedTermsOfService)
                }
                state={{ acceptedTermsOfService, allowMarketingMaterial }}
              />
            </FForm>
          );
        }}
      </Formik>
    </>
  );
};
