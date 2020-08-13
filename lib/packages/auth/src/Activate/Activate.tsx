import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { Form, Formik } from 'formik';
import { validatePassword, validatePasswordConfirmation, validateSchema } from '../helpers/validates';
import { FieldInput } from '../FieldInput';
import { FieldButton } from '../FieldInput/FieldButton';
import { ActivateStep } from '../Api';
import { ActivateSuccessRedirect } from './ActivateSuccessRedirect';
import { ActivateFailedRedirect } from './ActivateFailedRedirect';
import { pageWrapper } from '../helpers';

export class Activate extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;
  userId: string = '';
  token: string = '';

  render() {
    const { activateAccount, activateState: { loading, error, step } } = this.context!;
    const url = new URL(window?.location.href);
    this.userId = url.searchParams.get('userId') || '';
    this.token = url.searchParams.get('token') || '';

    if (!this.userId || !this.token) {
      return <ActivateFailedRedirect/>;
    }

    if (step === ActivateStep.success) {
      return <ActivateSuccessRedirect/>;
    }

    return <Formik
      validationSchema={validateSchema({
        password: validatePassword,
        confirmPassword: validatePasswordConfirmation(),
      })}
      enableReinitialize={true}
      initialValues={{ password: '', confirmPassword: '' }}
      onSubmit={({ password }) => activateAccount({ userId: this.userId, token: this.token, password })}>
      <Form>
        <FieldInput type='password'
                    name='password'
                    label='New Password'
                    placeholder='Enter your password'/>
        <FieldInput type='password'
                    name='confirmPassword'
                    label='Confirm New password'
                    placeholder='Enter your password again'/>
        <FieldButton fluid={true} loading={loading} primary={!loading}>Activate the account</FieldButton>
        {error && <div className='fe-login-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}


export const ActivatePage = pageWrapper(Activate, 'ActivatePage');
