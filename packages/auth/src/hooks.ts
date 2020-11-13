/* istanbul ignore file */

import { useDispatch, useSelector, memoEqual } from '@frontegg/react-core';
import { bindActionCreators, CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import { actions, AuthActions, AuthState, User } from './Api';
import { teamActions, TeamState } from './Api/TeamState';
import { useMemo } from 'react';

export const pluginName = 'auth';
const pluginActions = actions;

export type AuthMapper = {
  state: (state: AuthState) => any;
  actions: (actions: AuthActions) => any;
};

export type AuthStateMapper<S extends object> = (state: AuthState) => S;
export type AuthActionsMapper<A> = (state: AuthActions) => A;

const defaultMapper: AuthMapper = {
  state: (state: AuthState) => state,
  actions: (actions: AuthActions) => actions,
};

export const useAuth = <S extends object>(stateMapper: AuthStateMapper<S> = defaultMapper.state): S & AuthActions => {
  const dispatch = useDispatch();
  const bindedActions = useMemo(() => bindActionCreators(pluginActions, dispatch), [pluginActions, dispatch]);
  const state = useSelector((state: any) => stateMapper(state[pluginName]), memoEqual);
  return {
    ...(state as S),
    ...bindedActions,
  };
};

/**
 * ```jsx
 * export const MyFunctionComponent = () => {
 *   const isAuthenticated  = useIsAuthenticated();
 *   return isAuthenticated ? <div>Hello User</div> : <Redirect to={'/login'}/>
 * }
 * ```
 *
 * use this frontegg hook function to get if user is "Authenticated"
 */
export const useIsAuthenticated = (): boolean =>
  useSelector(({ [pluginName]: { isAuthenticated } }: any) => isAuthenticated, memoEqual);

/**
 * ```jsx
 * export const MyFunctionComponent = () => {
 *   const user = useAuthUser();
 *   return user ? <div>Hello {user.name}!</div> : <div>Hello Guest!</div>
 * }
 * ```
 *
 * use this frontegg hook function to get the authenticated user
 * the return user is null if not authenticated
 */
export const useAuthUser = (): User => {
  const { user, routes, onRedirectTo } = useSelector(
    ({ [pluginName]: { user, routes, onRedirectTo } }: { auth: AuthState }) => ({
      user,
      routes,
      onRedirectTo,
    }),
    memoEqual
  );

  if (user == null) {
    onRedirectTo(routes.loginUrl, { refresh: true });
    return {} as User;
  }
  return user;
};
export const useAuthUserOrNull = (): User | null => {
  const { user } = useSelector(
    ({ [pluginName]: { user, routes, onRedirectTo } }: { auth: AuthState }) => ({ user }),
    memoEqual
  );
  return user || null;
};

export const sliceReducerActionsBy = <T extends SliceCaseReducers<any>>(reducer: T): CaseReducerActions<T> => {
  const reducerKeys = Object.keys(reducer);
  const reducerActions = reducerKeys.map((key) => ({ [key]: actions[key as keyof typeof actions] }));
  return reducerActions.reduce((p, n) => ({ ...p, ...n }), {}) as CaseReducerActions<T>;
};
