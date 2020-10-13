export enum ActivateStep {
  'activating' = 'activating',
  'success' = 'success',
}

export interface ActivateState {
  loading: boolean;
  error?: any;
  step: ActivateStep;
}
