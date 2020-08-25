import { AuthPluginOptions } from '../interfaces';
import { RedirectOptions } from '@frontegg/react-core';
export interface User {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expires: string;
    [key: string]: any;
}
export declare enum LoginStep {
    'preLogin' = "preLogin",
    'loginWithPassword' = "loginWithPassword",
    'loginWithTwoFactor' = "loginWithTwoFactor",
    'redirectToSSO' = "redirectToSSO",
    'success' = "success"
}
export interface LoginState {
    loading: boolean;
    error?: any;
    step: LoginStep;
    ssoRedirectUrl?: string;
    mfaRequired?: boolean;
    mfaToken?: string;
}
export declare enum ActivateStep {
    'activating' = "activating",
    'success' = "success"
}
export interface ActivateState {
    loading: boolean;
    error?: any;
    step: ActivateStep;
}
export declare enum ForgotPasswordStep {
    'forgotPassword' = "forgotPassword",
    'success' = "success"
}
export interface ForgotPasswordState {
    step: ForgotPasswordStep;
    email: string;
    loading: boolean;
    error?: any;
}
export interface AuthStateUrl {
    authenticatedUrl: string;
    loginUrl: string;
    logoutUrl: string;
    activateUrl: string;
    forgetPasswordUrl: string;
    resetPasswordUrl: string;
}
export interface FronteggState {
    auth: AuthState;
}
export interface AuthState extends AuthStateUrl, AuthPluginOptions {
    error?: any;
    isAuthenticated: boolean;
    isLoading: boolean;
    user?: User;
    isSSOAuth: boolean;
    loginState: LoginState;
    activateState: ActivateState;
    forgetPasswordState: ForgotPasswordState;
    onRedirectTo: (path: string, opts?: RedirectOptions) => void;
}
export declare type PreLoginPayload = {
    email: string;
};
export declare type LoginPayload = {
    email: string;
    password: string;
};
export declare type LogoutPayload = () => void;
export declare type VerifyMFAPayload = {
    mfaToken: string;
    value: string;
};
export declare type ActivateAccountPayload = {
    token: string;
    userId: string;
    password: string;
};
export declare type ForgotPasswordPayload = PreLoginPayload;
export declare type ResetPasswordPayload = ActivateAccountPayload;
