import { AuthActions, AuthState } from './Api';

export type AuthMapper = {
  state: (state: AuthState) => any;
  actions: (actions: AuthActions) => any;
};
