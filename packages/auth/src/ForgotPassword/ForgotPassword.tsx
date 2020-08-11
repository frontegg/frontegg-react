import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { pageWrapper } from '../helpers';
import { validateEmail, validateSchema } from '../helpers/validates';
import { Form, Formik } from 'formik';
import { FieldInput } from '../FieldInput';
import { FieldButton } from '../FieldInput/FieldButton';
import { ForgotPasswordStep } from '../Api';
import { ForgotPasswordSuccessRedirect } from './ForgotPasswordSuccessRedirect';

export class ForgotPassword extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    const { forgetPasswordState: { loading, email, error, step }, forgotPassword } = this.context!;


    if (step === ForgotPasswordStep.success) {
      return <ForgotPasswordSuccessRedirect/>;
    }

    return <Formik
      initialValues={{ email }}
      validationSchema={validateSchema({
        email: validateEmail,
      })}
      isInitialValid={validateEmail.isValidSync(email)}
      onSubmit={({ email }) => forgotPassword({ email })}
    >
      <Form className='fe-login-two-factor'>
        <FieldInput defaultValue={email} name='email' placeholder='name@example.com' label={'Forgot password for Email'}/>
        <FieldButton disabledDirty={true} fluid={true} primary={!loading} loading={loading}>Remind Me</FieldButton>
        {error && <div className='fe-login-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}

export const ForgotPasswordPage = pageWrapper(ForgotPassword, 'ForgotPasswordPage');
