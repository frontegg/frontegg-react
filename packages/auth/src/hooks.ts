import { useDispatch, useSelector } from 'react-redux';
import { memoEqual } from '@frontegg/react-core';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions,  User } from './Api';
import { AuthActionsMapper, AuthStateMapper, defaultMapper } from './helpers';

const pluginName = 'auth';
const pluginActions = actions;

export const useAuth = <S, A>(stateMapper: AuthStateMapper<S> = defaultMapper.state, actionsMapper: AuthActionsMapper<A> = defaultMapper.actions) => {
  const dispatch = useDispatch();
  const bindedActions = bindActionCreators(actionsMapper(pluginActions) as any, dispatch);
  const state = useSelector((state: any) => stateMapper(state[pluginName]), memoEqual);
  return {
    ...state as S,
    ...bindedActions as A,
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
export const useIsAuthenticated = (): boolean => useSelector(({ [pluginName]: { isAuthenticated } }: any) => isAuthenticated, memoEqual);

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
export const useAuthUser = (): User | undefined => useSelector(({ [pluginName]: { user } }: any) => user, memoEqual);
