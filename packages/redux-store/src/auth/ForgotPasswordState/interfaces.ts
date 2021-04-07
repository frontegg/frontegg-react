import { TestConfig } from 'owasp-password-strength-test';

export enum ForgotPasswordStep {
  'forgotPassword' = 'forgotPassword',
  'success' = 'success',
}

export interface ForgotPasswordState {
  step: ForgotPasswordStep;
  passwordConfig: Partial<TestConfig> | null;
  email: string;
  loading: boolean;
  error?: any;
}
