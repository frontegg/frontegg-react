import React from 'react';
import { Field, FieldProps, Form, Formik } from 'formik';
import {
  validateSchema,
  validateTwoFactorCode,
  FieldInput,
  FieldButton,
} from '@frontegg/react-core';
import { AuthActions, AuthState, LoginStep } from '../Api';
import { withAuth } from '../HOCs';
import { Button } from 'semantic-ui-react';

const mapper = {
  state: ({ loginState }: AuthState) => ({ loginState }),
  actions: ({ loginWithMfa, setLoginState }: AuthActions) => ({ loginWithMfa, setLoginState }),
};

class LoginWithTwoFactorComponent extends React.Component<ReturnType<typeof mapper.state> & ReturnType<typeof mapper.actions>> {
  render() {
    const { loginState: { loading, error, mfaToken }, loginWithMfa } = this.props;

    const codeLabelButton = <Field>
      {({ form: { values } }: FieldProps) => (
        <Button disabled={loading} type='button' className='fe-field-button' onClick={() => {
          this.props.setLoginState({ step: LoginStep.recoverTwoFactor });
        }}>Recover Multi-Factor</Button>
      )}
    </Field>;

    return <Formik
      initialValues={{ code: '' }}
      validationSchema={validateSchema({
        code: validateTwoFactorCode,
      })}
      onSubmit={({ code }) => loginWithMfa({ mfaToken: mfaToken || '', value: code })}
    >
      <Form className='fe-login-two-factor'>
        <FieldInput label={'Please enter the 6 digit code'}
                    labelButton={codeLabelButton}
                    name='code' focus={true}/>

        <FieldButton fluid={true} primary={!loading} loading={loading}>Login</FieldButton>
        {error && <div className='fe-login-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}

export const LoginWithTwoFactor = withAuth(LoginWithTwoFactorComponent, mapper);
