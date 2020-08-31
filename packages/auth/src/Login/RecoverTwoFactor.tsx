import React from 'react';
import { Form, Formik } from 'formik';
import { withAuth } from '../HOCs';
import { AuthActions, AuthState } from '../Api';
import { FieldButton, FieldInput, validateSchema, validateTwoFactorCode } from '@frontegg/react-core';


const mapper = {
  state: ({ loginState }: AuthState) => ({ loginState }),
  actions: ({ recoverMfa }: AuthActions) => ({ recoverMfa }),
};

class RecoverTwoFactorComponent extends React.Component<ReturnType<typeof mapper.state> & ReturnType<typeof mapper.actions>> {

  render() {
    const { loginState: { loading, error, email }, recoverMfa } = this.props;
    return <Formik
      initialValues={{ code: '' }}
      validationSchema={validateSchema({
        code: validateTwoFactorCode,
      })}
      onSubmit={({ code }) => recoverMfa({ email: email ?? '', recoveryCode: code })}
    >
      <Form className='fe-login-two-factor'>
        <FieldInput label={'Please enter the recovery code'} name='code' focus={true}/>

        <FieldButton fluid={true} primary={!loading} loading={loading}>Disable MFA</FieldButton>
        {error && <div className='fe-login-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}

export const RecoverTwoFactor = withAuth(RecoverTwoFactorComponent, mapper);
