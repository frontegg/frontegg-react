import { IUserProfile } from '@frontegg/react-core';

export interface ProfileState {
  loading: boolean;
  error?: any;
  saving?: boolean;
  profile?: IUserProfile;
}
