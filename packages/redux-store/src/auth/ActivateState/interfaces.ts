export enum ActivateAccountStep {
  'activating' = 'activating',
  'success' = 'success',
  'resend' = 'resend',
}

export interface ActivateAccountState {
  loading: boolean;
  error?: any;
  step: ActivateAccountStep;
  resentEmail: boolean;
}
