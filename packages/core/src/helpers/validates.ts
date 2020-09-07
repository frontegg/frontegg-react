import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const validatePassword = (t: TFunction) =>
  Yup.string()
    .min(6, t('validation.min-length', { name: 'Password', limit: 6 }))
    .required(t('validation.required-field', { name: 'password' }));

export const validateEmail = (t: TFunction) =>
  Yup.string()
    .email(t('validation.must-be-a-valid-email', 'Must be a valid email'))
    .required(t('validation.required-field', { name: 'email' }));

export const validateTwoFactorCode = (t: TFunction) =>
  Yup.string()
    .length(6, t('validation.min-length', { name: 'Code', limit: 6 }))
    .required(t('validation.required-field', { name: 'code' }));

export const validateTwoFactorRecoveryCode = (t: TFunction) =>
  Yup.string()
    .length(12, t('validation.length', { name: 'code', limit: 12 }))
    .required(t('validation.required-field', { name: 'code' }));

export const validatePasswordConfirmation = (t: TFunction, field: string = 'password') =>
  Yup.string()
    .required(t('validation.required-field', { name: 'confirmation of the password' }))
    .when('password', {
      is: (val) => !!(val && val.length > 0),
      then: Yup.string().oneOf([Yup.ref(field)], t('validation.passwords-must-match', 'Passwords must match')),
    });

export const validateSchema = (props: any) => Yup.object(props);
