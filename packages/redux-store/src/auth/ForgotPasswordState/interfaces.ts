export enum ForgotPasswordStep {
  'forgotPassword' = 'forgotPassword',
  'success' = 'success',
}

export interface TestConfig {
  allowPassphrases: boolean;
  maxLength: number;
  minLength: number;
  minPhraseLength: number;
  minOptionalTestsToPass: number;
}

export interface ForgotPasswordState {
  step: ForgotPasswordStep;
  passwordConfig: Partial<TestConfig> | null;
  email: string;
  loading: boolean;
  error?: any;
}
