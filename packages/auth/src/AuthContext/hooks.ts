import { useContext } from 'react';
import { IAuthContext, AuthContext } from './AuthContext';
import { User } from '../Api/interfaces';

/**
 * ```jsx
 * export const MyFunctionComponent = () => {
 *   const { isAuthenticated, user } = useAuth();
 *   return isAuthenticated ? <div>Hello {user.name}!</div> : <div>Hello Guest!</div>
 * }
 * ```
 *
 * use this frontegg hook function to get access to the FronteggAuthContext
 */
export const useAuth = (): IAuthContext => useContext(AuthContext);

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
export const useIsAuthenticated = (): boolean => useContext(AuthContext).isAuthenticated;

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
export const useAuthUser = (): User | null => useContext(AuthContext).user || null;
