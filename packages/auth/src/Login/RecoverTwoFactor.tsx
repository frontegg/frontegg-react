import React from 'react';
import { Form, Formik } from 'formik';
import { withAuth } from '../HOCs';
import { AuthActions, AuthState } from '../Api';
import {
  FieldButton,
  FieldInput, omitProps, RendererFunction,
  validateSchema,
  validateTwoFactorRecoveryCode,
  WithT,
  withT,
} from '@frontegg/react-core';

const stateMapper = ({ loginState }: AuthState) => ({ loginState });
const actionsMapper = ({ recoverMfa }: AuthActions) => ({ recoverMfa });

export interface RecoverTwoFactorProps {
  renderer?: RendererFunction<Props, RecoverTwoFactorProps>
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & RecoverTwoFactorProps;

class RecoverTwoFactorComponent extends React.Component<Props> {

  render() {
    const { renderer, t, loginState: { loading, error, email }, recoverMfa } = this.props;

    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']));
    }

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
        {error && <div className='fe-error-message'>{error}</div>}
      </Form>
    </Formik>;
  }
}

export const RecoverTwoFactor = withAuth(withT()(RecoverTwoFactorComponent), stateMapper, actionsMapper);
