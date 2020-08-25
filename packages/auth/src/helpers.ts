import { AuthActions, AuthState } from './Api';

export type AuthMapper = {
  state: (state: AuthState) => any
  actions: (actions: AuthActions) => any
}

export const defaultMapper: AuthMapper = {
  state: (state: AuthState) => state,
  actions: (actions: AuthActions) => actions,
};

export const createMapper = (mapper: Partial<AuthMapper>) => ({
  state: mapper.state ?? defaultMapper.state,
  actions: mapper.actions ?? defaultMapper.actions,
});
