import { withAuth } from '../HOCs';
import { authPageWrapper } from '../components';
import React from 'react';


type Props = {};

class ForgotPasswordComponent extends React.Component<Props> {

  render() {
    return (
      <div>
        ForgotPasswordComponent
      </div>
    );
  }
}


export const ForgotPassword = withAuth(ForgotPasswordComponent);

export const ForgotPasswordPage = authPageWrapper(ForgotPassword);
