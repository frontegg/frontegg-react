export interface SignUpState {
  loading: boolean;
  allowSignUps: boolean;
  allowNotVerifiedUsersLogin: boolean;
  error?: string;
  firstLoad: boolean;
  shouldActivate?: boolean;
  stage: SignUpStage;
}

export enum SignUpStage {
  SignUp = 'SignUp',
  SignUpSuccess = 'SignUpSuccess',
}
