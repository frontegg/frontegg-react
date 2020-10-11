import { IActivateAccount } from '@frontegg/react-core';

export enum ActivateStep {
  'activating' = 'activating',
  'success' = 'success',
}

export interface ActivateState {
  loading: boolean;
  error?: any;
  step: ActivateStep;
}

export interface ActivateActions {
  activateAccount: (payload: IActivateAccount) => void;
}
