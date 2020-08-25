import { useDispatch, useSelector } from 'react-redux';
import { memoEqual } from '@frontegg/react-core';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions, FronteggState, User } from './Api';
import { AuthMapper, createMapper, defaultMapper } from './helpers';


export const useAuth = (passedMapper: Partial<AuthMapper> = defaultMapper) => {
  const mapper = createMapper(passedMapper);
  const dispatch = useDispatch();
  const bindedActions = bindActionCreators(mapper.actions(actions) as any, dispatch);
  const state = useSelector(({ auth }: any) => mapper.state(auth), memoEqual);
  return {
    ...state,
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
export const useIsAuthenticated = (): boolean => useSelector(({ auth: { isAuthenticated } }: FronteggState) => isAuthenticated, memoEqual);

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
export const useAuthUser = (): User | undefined => useSelector(({ auth: { user } }: FronteggState) => user, memoEqual);
