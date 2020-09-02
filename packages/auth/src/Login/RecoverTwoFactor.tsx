import React from 'react';
import { Formik } from 'formik';
import { withAuth } from '../HOCs';
import { AuthActions, AuthState } from '../Api';
import {
  Form,
  Input,
  Button,
  omitProps, RendererFunction,
  validateSchema,
  validateTwoFactorRecoveryCode,
  WithT,
  withT, ErrorMessage,
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
      <Form inFormik>
        <Input inFormik fullWidth name='code'
               label={t('auth.login.please-enter-the-recovery-code')}/>

        <Button submit inFormik fullWidth variant='primary' loading={loading}>
          {t('auth.login.disable-mfa')}
        </Button>
        <ErrorMessage error={error}/>
      </Form>
    </Formik>;
  }
}

export const RecoverTwoFactor = withAuth(withT()(RecoverTwoFactorComponent), stateMapper, actionsMapper);
