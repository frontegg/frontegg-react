import { IUserProfile } from '@frontegg/rest-api';
import { WithCallback } from '../../interfaces';

export interface ProfileState {
  loading: boolean;
  error?: any;
  saving?: boolean;
  profile?: IUserProfile;
}

export type SaveProfilePayload = Partial<WithCallback<IUserProfile, IUserProfile>>;
