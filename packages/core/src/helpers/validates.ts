import * as Yup from 'yup';
import { TFunction } from 'i18next';
import { ValidationError } from 'yup';

export const validatePassword = (t: TFunction) =>
  Yup.string()
    .min(6, t('validation.min-length', { name: t('common.password'), limit: 6 }))
    .required(t('validation.required-field', { name: t('common.password') }));

export const validateEmail = (t: TFunction) =>
  Yup.string()
    .email(t('validation.must-be-a-valid-email', 'Must be a valid email'))
    .required(t('validation.required-field', { name: t('common.email') }));

export const validateTwoFactorCode = (t: TFunction) =>
  Yup.string()
    .length(6, t('validation.min-length', { name: 'Code', limit: 6 }))
    .required(t('validation.required-field', { name: 'code' }));

export const validateTwoFactorRecoveryCode = (t: TFunction) =>
  Yup.string()
    .min(8, t('validation.max-length', { name: 'code', limit: 8 }))
    .required(t('validation.required-field', { name: 'code' }));

export const validatePasswordConfirmation = (t: TFunction, field: string = 'password') =>
  Yup.string()
    .required(t('validation.required-field', { name: 'confirmation of the password' }))
    .when('password', {
      is: (val) => !!(val && val.length > 0),
      then: Yup.string().oneOf([Yup.ref(field)], t('validation.passwords-must-match', 'Passwords must match')),
    });

export const validateDomain = (t: TFunction) =>
  Yup.string()
    .matches(
      /^((?:(?:(?:\w[.\-+]?)*)\w)+)((?:(?:(?:\w[.\-+]?){0,62})\w)+)\.(\w{2,6})$/,
      t('validation.must-be-a-valid-domain', 'Must be a valid domain')
    )
    .required(t('validation.required-field', { name: 'domain' }));

export const validateUrl = (name: string, t: TFunction) =>
  Yup.string()
    .url(t('validation.must-be-a-valid-url', 'Must be a valid URL'))
    .required(t('validation.required-field', { name }));

export const validateLength = (name: string, t: TFunction) =>
  Yup.string()
    .min(6, t('validation.min-length', { name, limit: 2 }))
    .required(t('validation.required-field', { name }));

export const validateRequired = (name: string, t: TFunction) =>
  Yup.string().required(t('validation.required-field', { name }));

export const validateArrayLength = (t: TFunction, name: string) =>
  Yup.array().required(t('validation.required-field', { name }));

export const validateSchema = (props: any) => Yup.object(props);

export const validateSchemaSync = (props: any, values: any) =>
  new Promise((resolve) => {
    validateSchema(props)
      .validate(values, { abortEarly: false })
      .then(() => resolve({}))
      .catch((errors) => {
        resolve(
          errors.inner
            .map((error: ValidationError) => ({ [error.path]: error.message }))
            .reduce((p: object, n: object) => ({ ...p, ...n }), {})
        );
      });
  });
