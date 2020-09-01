import React from 'react';
import { Field, Form, Formik } from 'formik';
import {
  validateSchema,
  validateTwoFactorCode,
  FieldInput,
  FieldButton, withT, WithT,
} from '@frontegg/react-core';
import { AuthActions, AuthState, LoginStep } from '../Api';
import { withAuth } from '../HOCs';
import { Button } from 'semantic-ui-react';

const stateMapper = ({ loginState }: AuthState) => ({ loginState });
const actionsMapper = ({ loginWithMfa, setLoginState }: AuthActions) => ({ loginWithMfa, setLoginState });

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT;

class LoginWithTwoFactorComponent extends React.Component<Props> {

  recoverCodeButton = () => {
    const { t, loginState: { loading }, setLoginState } = this.props;
    return <Field>
      {() => (
        <Button disabled={loading} type='button' className='fe-field-button' onClick={() => {
          setLoginState({ step: LoginStep.recoverTwoFactor });
        }}>{t('auth.login.recover-multi-factor')}</Button>
      )}
    </Field>;
  };

  render() {
    const { t, loginState: { loading, error, mfaToken }, loginWithMfa } = this.props;

    return <Formik
      initialValues={{ code: '' }}
      validationSchema={validateSchema({
        code: validateTwoFactorCode(t),
      })}
      onSubmit={({ code }) => loginWithMfa({ mfaToken: mfaToken || '', value: code })}
    >
      <Form className='fe-login-two-factor'>
        <FieldInput label={t('auth.login.please-enter-the-6-digit-code')}
                    labelButton={this.recoverCodeButton()}
                    name='code'
                    focus={true}/>
        <FieldButton fluid={true} primary={!loading} loading={loading}>{t('auth.login.login')}</FieldButton>
        {error && <div className='fe-login-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}

export const LoginWithTwoFactor = withAuth(withT()(LoginWithTwoFactorComponent), stateMapper, actionsMapper);
