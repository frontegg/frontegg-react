import { IGetActivateAccountStrategyResponse } from '@frontegg/rest-api';
import { WithStatus } from '../../interfaces';

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
  activationStrategy: ActivateAccountStrategyState;
}

export type ActivateAccountStrategyState = WithStatus & { strategy?: IGetActivateAccountStrategyResponse };
