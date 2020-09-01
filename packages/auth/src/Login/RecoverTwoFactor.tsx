import React from 'react';
import { Form, Formik } from 'formik';
import { withAuth } from '../HOCs';
import { AuthActions, AuthState } from '../Api';
import {
  FieldButton,
  FieldInput,
  validateSchema,
  validateTwoFactorRecoveryCode,
  WithT,
  withT,
} from '@frontegg/react-core';

const stateMapper = ({ loginState }: AuthState) => ({ loginState });
const actionsMapper = ({ recoverMfa }: AuthActions) => ({ recoverMfa });

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT;

class RecoverTwoFactorComponent extends React.Component<Props> {

  render() {
    const { t, loginState: { loading, error, email }, recoverMfa } = this.props;
    return <Formik
      initialValues={{ code: '' }}
      validationSchema={validateSchema({
        code: validateTwoFactorRecoveryCode(t),
      })}
      onSubmit={({ code }) => recoverMfa({ email: email ?? '', recoveryCode: code })}
    >
      <Form className='fe-login-two-factor'>
        <FieldInput label={t('auth.login.please-enter-the-recovery-code')} name='code' focus={true}/>

        <FieldButton fluid={true} primary={!loading} loading={loading}>{t('auth.login.disable-mfa')}</FieldButton>
        {error && <div className='fe-login-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}

export const RecoverTwoFactor = withAuth(withT()(RecoverTwoFactorComponent), stateMapper, actionsMapper);
