export interface SignUpState {
  loading: boolean;
  allowSignUps: boolean;
  error?: string;
  firstLoad: boolean;
  shouldActivate?: boolean;
  stage: SignUpStage;
}

export enum SignUpStage {
  SignUp = 'SignUp',
  SignUpSuccess = 'SignUpSuccess',
}
