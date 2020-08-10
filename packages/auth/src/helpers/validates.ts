import * as Yup from 'yup';

export const validatePassword = Yup.string().min(6).required('The password is required');

export const validatePasswordConfirmation = (field: string = 'password') =>
  Yup.string()
    .required('The confirmation of the password is required')
    .oneOf([Yup.ref(field), null], 'Passwords must match');

export const validateEmail = Yup.string().email('Must be a valid email').required('The Email is required');

export const validateTwoFactorCode = Yup.string().required('The code is required');

export const validateSchema = (props: any) => Yup.object(props);

export const validateRequiredString = (field?: string) => Yup.string().required(field && `The ${field} is required`);

export const validateRequiredCode = (field?: string) => Yup.number().required(field && `The ${field} is required`);
