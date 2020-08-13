import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { pageWrapper } from '../helpers';
import { ForgotPasswordStep } from '../Api';
import { ResetPasswordSuccessRedirect } from './ResetPasswordSuccessRedirect';
import { ResetPasswordFailedRedirect } from './ResetPasswordFailedRedirect';
import { Form, Formik } from 'formik';
import { validatePassword, validatePasswordConfirmation, validateSchema } from '../helpers/validates';
import { FieldInput } from '../FieldInput';
import { FieldButton } from '../FieldInput/FieldButton';

export class ResetPassword extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;
  userId: string = '';
  token: string = '';

  render() {
    const { forgetPasswordState: { loading, error, step }, resetPassword } = this.context!;
    const url = new URL(window?.location.href);
    this.userId = url.searchParams.get('userId') || '';
    this.token = url.searchParams.get('token') || '';

    if (!this.userId || !this.token) {
      return <ResetPasswordFailedRedirect/>;
    }

    if (step === ForgotPasswordStep.success) {
      return <ResetPasswordSuccessRedirect/>;
    }

    return <Formik
      validationSchema={validateSchema({
        password: validatePassword,
        confirmPassword: validatePasswordConfirmation(),
      })}
      enableReinitialize={true}
      initialValues={{ password: '', confirmPassword: '' }}
      onSubmit={({ password }) => resetPassword({ userId: this.userId, token: this.token, password })}>
      <Form>
        <FieldInput type='password'
                    name='password'
                    label='New Password'
                    placeholder='Enter your password'/>
        <FieldInput type='password'
                    name='confirmPassword'
                    label='Confirm New password'
                    placeholder='Enter your password again'/>
        <FieldButton fluid={true} loading={loading} primary={!loading}>Reset Password</FieldButton>
        {error && <div className='fe-login-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}

export const ResetPasswordPage = pageWrapper(ResetPassword, 'ResetPasswordPage');
