import { IUserProfile } from '@frontegg/rest-api';

export interface ProfileState {
  loading: boolean;
  error?: any;
  saving?: boolean;
  profile?: IUserProfile;
}
