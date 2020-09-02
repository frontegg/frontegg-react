import React from 'react';
import { Formik } from 'formik';
import {
  validateSchema,
  validateTwoFactorCode,
  withT, WithT,
  RendererFunction,
  omitProps,
  Form,
  Button,
  Input,
  ErrorMessage,
} from '@frontegg/react-core';
import { AuthActions, AuthState, LoginStep } from '../Api';
import { withAuth } from '../HOCs';

const stateMapper = ({ loginState }: AuthState) => ({ loginState });
const actionsMapper = ({ loginWithMfa, setLoginState }: AuthActions) => ({ loginWithMfa, setLoginState });


export interface LoginWithTwoFactorProps {
  renderer?: RendererFunction<Props, LoginWithTwoFactorProps>
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & LoginWithTwoFactorProps;

class LoginWithTwoFactorComponent extends React.Component<Props> {

  render() {
    const { renderer, t, loginState: { loading, error, mfaToken }, loginWithMfa, setLoginState } = this.props;
    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']));
    }
    return <Formik
      initialValues={{ code: '' }}
      validationSchema={validateSchema({
        code: validateTwoFactorCode(t),
      })}
      onSubmit={({ code }) => loginWithMfa({ mfaToken: mfaToken || '', value: code })}
    >
      <Form inFormik>
        <Input
          inFormik
          fullWidth
          label={t('auth.login.please-enter-the-6-digit-code')}
          name='code'/>


        <Button inFormik fullWidth submit variant='primary' loading={loading}>
          {t('auth.login.login')}
        </Button>

        <div className='fe-note'>
          <div className='fe-note-title'>{t('auth.login.disable-two-factor-title')}</div>
          <div className='fe-note-description'>
            <Button className='fe-link-button' testId='recover-two-factor-button' onClick={() => {
              setLoginState({ step: LoginStep.recoverTwoFactor });
            }}>{t('common.click-here')}</Button>&nbsp;
            {t('auth.login.disable-two-factor-description')}
          </div>
        </div>

        <ErrorMessage error={error}/>
      </Form>
    </Formik>;
  }
}

export const LoginWithTwoFactor = withAuth(withT()(LoginWithTwoFactorComponent), stateMapper, actionsMapper);
