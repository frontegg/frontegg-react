import React from 'react';
import { Form, Formik } from 'formik';
import {
  validateSchema,
  validateTwoFactorCode,
  FieldInput,
  FieldButton,
} from '@frontegg/react-core';
import { AuthActions, AuthState } from '../Api';
import { withAuth } from '../HOCs';

const mapper = {
  state: (state: AuthState) => ({ loginState: state.loginState }),
  actions: (actions: AuthActions) => ({ verifyMfa: actions.verifyMfa }),
};

class LoginWithTwoFactorComponent extends React.Component {
  render() {
    const { loginState: { loading, error, mfaToken }, verifyMfa } = this.context!;
    return <Formik
      initialValues={{ code: '' }}
      validationSchema={validateSchema({
        code: validateTwoFactorCode,
      })}
      onSubmit={({ code }) => verifyMfa({ mfaToken: mfaToken || '', value: code })}
    >
      <Form className='fe-login-two-factor'>
        <FieldInput label={'Please enter the 6 digit code'} name='code' focus={true}/>

        <FieldButton fluid={true} primary={!loading} loading={loading}>Login</FieldButton>
        {error && <div className='fe-login-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}

export const LoginWithTwoFactor = withAuth(LoginWithTwoFactorComponent, mapper);
