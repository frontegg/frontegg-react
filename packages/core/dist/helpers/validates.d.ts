import * as Yup from 'yup';
export declare const validatePassword: Yup.StringSchema<string>;
export declare const validateEmail: Yup.StringSchema<string>;
export declare const validateTwoFactorCode: Yup.StringSchema<string>;
export declare const validatePasswordConfirmation: (field?: string) => Yup.StringSchema<string>;
export declare const validateSchema: (props: any) => Yup.ObjectSchema<object | undefined>;
export declare const validateRequiredString: (field?: string | undefined) => Yup.StringSchema<string>;
export declare const validateRequiredCode: (field?: string | undefined) => Yup.NumberSchema<number>;
