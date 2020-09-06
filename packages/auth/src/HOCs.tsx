/* istanbul ignore file */

import React, { ComponentType, FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { AuthState, actions, AuthActions } from './Api';
import { FRONTEGG_AFTER_AUTH_REDIRECT_URL } from './constants';
import { useAuth, useIsAuthenticated } from './hooks';
import { connect, withT } from '@frontegg/react-core';

const pluginName = 'auth';
const pluginActions = actions;

const emptySelector = () => ({});
export const withAuth = <P extends any>(
  Component: ComponentType<P>,
  stateSelector?: (state: AuthState) => any,
  actionsSelector?: (actions: AuthActions) => any,
) => {
  const _stateSelector = stateSelector || emptySelector;
  const _actionsSelector = actionsSelector || emptySelector;

  const mapStateToProps = (state: any) => _stateSelector(state[pluginName]);
  const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(_actionsSelector(pluginActions) || {}, dispatch);

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withT()(Component as any)) as ComponentType<Omit<P, keyof (ReturnType<typeof _stateSelector> & ReturnType<typeof _actionsSelector>)>>;
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
export const withProtectedRoute = <P extends {}>(Component: ComponentType<P>) => function withProtectedRoute(props: P) {
  const { isAuthenticated, isLoading, loginUrl } = useAuth((state) => ({
    isAuthenticated: state,
    isLoading: state.isLoading,
    loginUrl: state.routes.loginUrl,
  }));
  return isLoading ? null : isAuthenticated ? <Component {...props} /> : onRedirecting(loginUrl);
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
export const ProtectedComponent: FC = ({ children }) => {
  const { isAuthenticated, routes: { loginUrl }, isLoading } = useAuth(
    ({ isAuthenticated, routes, isLoading }: AuthState) => ({ isAuthenticated, routes, isLoading }),
  );

  return isLoading ? null : isAuthenticated ? <>{children}</> : onRedirecting(loginUrl);
};


/**
 * ```jsx
 * export class MyApp extends Component {
 *   render() {
 *     return <Router>
 *       <Switch>
 *         <Route path='public-path'/>
 *         <ProtectedRoute path='authenticated-path'/>
 *       </Switch>
 *     </Router>
 *   }
 * }
 * ```
 *
 * they will be redirect child components to be displayed if the user is not authenticated
 * the client will be redirected to the login page and returned to the page they we're
 * redirected from after login
 */
export class ProtectedRoute extends React.Component<RouteProps> {
  render() {
    const { component, render, children, ...routeProps } = this.props;
    if (children != null) {
      return <Route {...routeProps}>
        <ProtectedComponent>
          {children}
        </ProtectedComponent>
      </Route>;
    }
    if (render != null) {
      return <Route {...routeProps} render={(props) =>
        <ProtectedComponent>
          {render(props)}
        </ProtectedComponent>
      }/>;
    }
    if (component != null) {
      return <Route {...routeProps} render={(props) =>
        <ProtectedComponent>
          {React.createElement(component, props)}
        </ProtectedComponent>
      }
      />;
    }
    return <Route {...routeProps}/>;
  }
}

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

