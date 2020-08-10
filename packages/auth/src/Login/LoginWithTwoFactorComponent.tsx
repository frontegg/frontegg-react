import React, { ContextType } from 'react';
// import { Formik, Form } from 'formik';
import { AuthContext } from '../AuthContext';

export class LoginWithTwoFactorComponent extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    // const { loginState: { loading } } = this.context!;
    return <div className='fe-login-pre-login'>
      {/*<Formik>*/}

      {/*</Formik>*/}
    </div>;
  }
}
