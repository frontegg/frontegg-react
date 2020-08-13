import React, { ContextType } from 'react';
import { Route, Switch } from 'react-router';
import { LoginPage, LogoutPage } from './Login';
import { ActivatePage } from './Activate';
import { ForgotPasswordPage, ResetPasswordPage } from './ForgotPassword';
import { AuthContext } from './AuthContext';

export class DefaultAuthRoutes extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    return <Switch>
      <Route exact path={this.context!.loginUrl} component={LoginPage}/>
      <Route exact path={this.context!.logoutUrl} component={LogoutPage}/>
      <Route exact path={this.context!.activateUrl} component={ActivatePage}/>
      <Route exact path={this.context!.forgetPasswordUrl} component={ForgotPasswordPage}/>
      <Route exact path={this.context!.resetPasswordUrl} component={ResetPasswordPage}/>
      <Route path='*' children={() => this.props.children}/>
    </Switch>;
  }
}
