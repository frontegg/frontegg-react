import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { AuthPageProps } from '../interfaces';
import ReactDOM from 'react-dom';

export class ForgotPassword extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  componentDidMount() {
    // queryParam
  }

  render() {

    /// account/activate
    return <div>forgetPasswordUrl</div>
  }
}

export class ForgotPasswordPage extends React.Component<AuthPageProps> {
  static defaultProps = {
    header: <img src='http://acmelogos.com/images/logo-1.svg' alt='logo'/>,
  };

  render() {
    const loginComponent = <div className='frontegg fe-login-page'>
      <div className='fe-login-container'>
        <div className='fe-login-header'>
          {this.props.header}
        </div>
        <ForgotPassword/>
      </div>
    </div>;
    return ReactDOM.createPortal(loginComponent, document.body, 'frontegg_forgot_password_page');
  }
}
