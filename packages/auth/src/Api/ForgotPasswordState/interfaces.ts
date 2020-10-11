import { IForgotPassword, IResetPassword } from '@frontegg/react-core';

export enum ForgotPasswordStep {
  'forgotPassword' = 'forgotPassword',
  'success' = 'success',
}

export interface ForgotPasswordState {
  step: ForgotPasswordStep;
  email: string;
  loading: boolean;
  error?: any;
}

export interface ForgotPasswordActions {
  forgotPassword: (payload: IForgotPassword) => void;
  resetPassword: (payload: IResetPassword) => void;
}
