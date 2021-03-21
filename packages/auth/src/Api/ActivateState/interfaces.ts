export enum ActivateStep {
  'activating' = 'activating',
  'success' = 'success',
  'resend' = 'resend',
}

export interface ActivateState {
  loading: boolean;
  error?: any;
  step: ActivateStep;
  resentEmail?: boolean;
}
