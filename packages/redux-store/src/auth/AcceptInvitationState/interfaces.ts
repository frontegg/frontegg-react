export enum AcceptInvitationStep {
  'validate' = 'validate',
  'invalid' = 'invalid',
  'pending' = 'pending',
  'success' = 'success',
  'failed' = 'failed',
}

export interface AcceptInvitationState {
  error?: string;
  step: AcceptInvitationStep;
}
