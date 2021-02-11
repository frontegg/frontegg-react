/* istanbul ignore file */

import { useDispatch, useSelector, memoEqual } from '@frontegg/react-core';
import { bindActionCreators, CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import { authActions, AuthActions, AuthPageRoutes, AuthState, User } from '@frontegg/redux-store/auth';
import { useMemo } from 'react';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';

export const pluginName = 'auth';

export type AuthMapper = {
  state: (state: AuthState) => any;
  actions: (actions: AuthActions) => any;
};

export type AuthStateMapper<S extends object> = (state: AuthState) => S;
export type AuthActionsMapper<A> = (state: AuthActions) => A;
export type StateHookFunction<T> = (() => T) & (<S extends object>(mapper: (state: T) => S) => S);

const defaultMapper: AuthMapper = {
  state: (state: AuthState) => state,
  actions: (actions: AuthActions) => actions,
};

export const useAuth = <S extends object>(stateMapper: AuthStateMapper<S> = defaultMapper.state): S & AuthActions => {
  const dispatch = useDispatch();
  const bindedActions = useMemo(() => bindActionCreators(authActions, dispatch), [authActions, dispatch]);
  const state = useSelector((state: any) => stateMapper(state[pluginName]), memoEqual);
  return {
    ...(state as S),
    ...bindedActions,
  };
};
export const useAuthActions = (): AuthActions => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(authActions, dispatch), [authActions]);
};

export const useOnRedirectTo = (): ((path: string, opts?: RedirectOptions) => void) => ContextHolder.onRedirectTo;

export const useAuthRoutes = (): AuthPageRoutes => useAuth((state) => ({ ...state.routes }));

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
  const { user } = useSelector(({ [pluginName]: { user } }: { auth: AuthState }) => ({ user }), memoEqual);
  return user || null;
};

export const sliceReducerActionsBy = <T extends SliceCaseReducers<any>>(reducer: T): CaseReducerActions<T> => {
  const reducerKeys = Object.keys(reducer);
  const reducerActions = reducerKeys.map((key) => ({ [key]: authActions[key as keyof AuthActions] }));
  return reducerActions.reduce((p, n) => ({ ...p, ...n }), {}) as CaseReducerActions<T>;
};

/**
 * hooks helpers
 */
export const stateHookGenerator = (stateMapper: any, subState: keyof AuthState): any => {
  return useSelector(
    (state: any) => stateMapper?.(state[pluginName][subState]) ?? state[pluginName][subState],
    memoEqual
  );
};
export const reducerActionsGenerator = (actions: any, reducers: SliceCaseReducers<any>) => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators({ ...actions, ...sliceReducerActionsBy(reducers) }, dispatch), [dispatch]);
};
