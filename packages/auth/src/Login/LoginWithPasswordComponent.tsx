import React, { ContextType } from 'react';
import { Form, Formik } from 'formik';
import { AuthContext, LoginStep } from '../AuthContext';
import { validateEmail, validatePassword, validateSchema } from '../helpers/validates';
import { FieldInput } from '../FieldInput';
import { FieldButton } from '../FieldInput/FieldButton';

export class LoginWithPasswordComponent extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    const { loginState: { loading, step, error }, isSSOAuth, preLogin, login } = this.context!;
    const displayPassword = !isSSOAuth || step == LoginStep.loginWithPassword;
    return <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validateSchema(
        displayPassword ? {
          email: validateEmail,
          password: validatePassword,
        } : {
          email: validateEmail,
        })}
      onSubmit={({ email, password }) => displayPassword ? login(email, password) : preLogin(email)}
    >
      <Form className='fe-login-pre-login'>
        <FieldInput name='email' placeholder='nam@example.com' label={'Email'}/>
        {displayPassword && <FieldInput
          label={'Password'}
          type='password'
          name='password'
          placeholder='********'/>}
        <FieldButton fluid={true} primary loading={loading}>Continue</FieldButton>

        {error && <div className='fe-login-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}
