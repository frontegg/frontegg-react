import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { Form, Formik } from 'formik';
import { validateSchema, validateTwoFactorCode } from '../helpers/validates';
import { FieldButton } from '../FieldInput/FieldButton';
import { FieldInput } from '../FieldInput';

export class LoginWithTwoFactorComponent extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

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
