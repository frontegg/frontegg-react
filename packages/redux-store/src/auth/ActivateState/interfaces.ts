export enum ActivateAccountStep {
  'activating' = 'activating',
  'success' = 'success',
}

export interface ActivateAccountState {
  loading: boolean;
  error?: any;
  step: ActivateAccountStep;
}
