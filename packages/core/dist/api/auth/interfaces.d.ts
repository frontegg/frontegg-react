export declare type IPreLogin = {
    email: string;
};
export declare type ILogin = {
    email: string;
    password: string;
};
export declare type ILoginResponse = {
    mfaRequired: boolean;
    accessToken: string;
    refreshToken: string;
    expires: string;
    expiresIn: number;
    mfaToken?: string;
};
export declare type ILoginWithMfa = {
    mfaToken: string;
    value: string;
};
export declare type IActivateAccount = {
    userId: string;
    token: string;
    password?: string;
};
export declare type IForgotPassword = {
    email: string;
};
export declare type IResetPassword = {
    token: string;
    userId: string;
    password: string;
};
export declare type IRecoverMFAToken = {
    email: string;
    recoveryCode: string;
};
export declare type IEnrollMfaResponse = {
    qrCode: string;
};
export declare type IVerifyMfa = {
    mfaToken: string;
    value: string;
};
export declare type IVerifyMfaResponse = {
    recoveryCode: string;
};
export declare type IDisableMfa = {
    token: string;
};
