import * as Yup from 'yup';
import { TFunction } from 'i18next';
import { ValidationError } from 'yup';
import owasp, { TestConfig } from 'owasp-password-strength-test';

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
    .when(field, {
      is: (val) => !!(val && val.length > 0),
      then: Yup.string().oneOf([Yup.ref(field)], t('validation.passwords-must-match', 'Passwords must match')),
    });

export const validatePasswordUsingOWASP = (testConfig: Partial<TestConfig> | null | undefined) =>
  Yup.string()
    .label('password')
    .required()
    .test('validate_owasp', 'Invalid Password', async function (value) {
      // Use function to access Yup 'this' context

      if (value == null) {
        return true;
      }
      testConfig && owasp.config(testConfig);
      const { errors } = owasp.test(value);
      // validate using owasp

      if (errors?.length) {
        return this.createError({ message: errors[0] });
      }
      return true;
    });

export const validateDomain = (t: TFunction) =>
  Yup.string()
    .matches(
      /(?=.{4,253}$)^((([A-Za-z0-9]{1,63})|([0-9]{1}))([\.]{1}|[\-]{1,})){1,}((?=.*[a-zA-Z])([a-zA-Z0-9]+){2,25}){1}/,
      t('validation.must-be-a-valid-domain', 'Must be a valid domain')
    )
    .required(t('validation.required-field', { name: 'domain' }));

export const validateUrl = (name: string, t: TFunction) =>
  Yup.string()
    .url(t('validation.must-be-a-valid-url', 'Must be a valid URL'))
    .required(t('validation.required-field', { name }));

export const validateLength = (name: string, limit: number, t: TFunction) =>
  Yup.string()
    .min(limit, t('validation.min-length', { name, limit }))
    .required(t('validation.required-field', { name }));

export const validateRequired = (name: string, t: TFunction) =>
  Yup.string().required(t('validation.required-field', { name }));

export const validateArrayLength = (t: TFunction, name: string) =>
  Yup.array().required(t('validation.required-field', { name }));

export const validateSchema = (props: any) => Yup.object(props);

export const validateObject = (name: string, t: TFunction) =>
  Yup.object()
    .required(t('validation.required-field', { name }))
    .typeError(t('validation.must-be-a-valid-json', { name }));

export const validationPhone = (t: TFunction) =>
  Yup.string()
    .matches(
      /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/,
      t('validation.invalid-phone', 'Invalid phone number')
    )
    .required(t('validation.required-field', { name: 'phone' }));

export const validateCheckbox = () => Yup.boolean().required().oneOf([true]);

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
