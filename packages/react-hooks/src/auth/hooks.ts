import { useMemo } from 'react';
import { bindActionCreators, CaseReducerActions, SliceCaseReducers } from '@frontegg/redux-store/toolkit';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { authActions, AuthActions, AuthPageRoutes, AuthState, User, authStoreName } from '@frontegg/redux-store/auth';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';

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

export const useAuth = <S extends object>(stateMapper: AuthStateMapper<S> = defaultMapper.state): S => {
  return useSelector((state: any) => stateMapper(state[authStoreName]), shallowEqual) as S;
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
  useSelector(({ [authStoreName]: { isAuthenticated } }: any) => isAuthenticated, shallowEqual);

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
  const routes = useAuthRoutes();
  const onRedirectTo = useOnRedirectTo();
  const user = useAuthUserOrNull();

  if (user == null) {
    onRedirectTo(routes.loginUrl, { refresh: true });
    return {} as User;
  }
  return user;
};

export const useAuthUserOrNull = (): User | null => {
  const { user } = useSelector(({ [authStoreName]: { user } }: any) => ({ user }), shallowEqual);
  return user || null;
};

/**
 * hooks helpers
 */
export const sliceReducerActionsBy = <T extends SliceCaseReducers<any>>(reducer: T): CaseReducerActions<T> => {
  const reducerKeys = Object.keys(reducer);
  const reducerActions = reducerKeys.map((key) => ({ [key]: authActions[key as keyof AuthActions] }));
  return reducerActions.reduce((p, n) => ({ ...p, ...n }), {}) as CaseReducerActions<T>;
};
export const stateHookGenerator = (stateMapper: any, subState: keyof AuthState): any => {
  return useSelector(
    (state: any) => stateMapper?.(state[authStoreName][subState]) ?? state[authStoreName][subState],
    shallowEqual
  );
};
export const reducerActionsGenerator = (actions: any, reducers: SliceCaseReducers<any>) => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators({ ...actions, ...sliceReducerActionsBy(reducers) }, dispatch), [dispatch]);
};
