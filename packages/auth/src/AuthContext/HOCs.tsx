import React, { ComponentType, ContextType, FC } from 'react';
import { IAuthContext } from './interfaces';
import { AuthContext } from './AuthContext';
import { FRONTEGG_AFTER_AUTH_REDIRECT_URL } from '../constants';
import { Redirect } from 'react-router';
import { useAuth, useIsAuthenticated } from './hooks';

/**
 * ```jsx
 * class SampleComponent extends Component {
 *   render() {
 *     const { isAuthenticated, user } = this.props;
 *     return isAuthenticated ? <div>Hello {user.name}!</div> : <div>Hello Guest!</div>
 *   }
 * }
 * export default withAuth(SampleComponent);
 * ```
 *
 * Wrap your class component in this HOC to give them access to the FronteggAuthContext
 */
export const withAuth = <P extends Partial<IAuthContext>>(
  Component: ComponentType<P>,
): ComponentType<Omit<P, keyof IAuthContext>> => {
  return (props: any) => (
    <AuthContext.Consumer>
      {(context) => <Component {...(props as P)} {...context} />}
    </AuthContext.Consumer>
  );
};


const onRedirecting = (loginUrl: string) => {
  window.localStorage.setItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL, window.location.pathname);
  return <Redirect to={loginUrl}/>;
};

/**
 * ```jsx
 * class MyProtectedComponent extends Component {
 *   render() {
 *     return <div>
 *       This is Protected Component with be displayed only if the user is authenticated
 *     </div>
 *   }
 * }
 * export default withProtectedRoute(MyProtectedComponent);
 * ```
 *
 * they will be redirected to the login page if not authenticated
 * returned to the page they we're redirected from after login
 */
export const withProtectedRoute = <P extends {}>(Component: ComponentType<P>) => {
  return class ProtectedRoute extends React.Component<P> {
    static contextType = AuthContext;
    context: ContextType<typeof AuthContext> | null = null;

    render() {
      const { isAuthenticated, loginUrl } = this.context!;
      return isAuthenticated ? <Component {...this.props} /> : onRedirecting(loginUrl);
    }
  };
};


/**
 * ```jsx
 * export class MyProtectedComponent extends Component {
 *   render() {
 *     return <ProtectedRoute>
 *       <div>My Child Components</div>
 *     </ProtectedRoute>
 *   }
 * }
 * ```
 *
 * they will be redirect child components to be displayed if the user is not authenticated
 * the client will be redirected to the login page and returned to the page they we're
 * redirected from after login
 */
export const ProtectedRoute: FC = ({ children }) => {
  const { isAuthenticated, loginUrl } = useAuth();
  return isAuthenticated ? <>{children}</> : onRedirecting(loginUrl);
};

/**
 * ```jsx
 * export class MyComponent extends Component {
 *   render() {
 *     return <>
 *        <div>This 'div' will always be visible</div>
 *        <ProtectedArea>
 *          <div>This 'div' will be displayed only if the user is authenticated</div>
 *        </ProtectedArea>
 *     </>
 *   }
 * }
 * ```
 *
 * they will be redirect child components to be displayed if the user is not authenticated
 */
export const ProtectedArea: FC = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <>{children}</> : null;
};
