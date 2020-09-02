import React from 'react';
import { Formik } from 'formik';
import { AuthActions, AuthState, LoginStep } from '../Api';
import { withAuth } from '../HOCs';
import {
  validateEmail,
  validateSchema,
  validatePassword,
  Button,
  Form,
  WithT, withT, Input, omitProps, RendererFunction,
  ErrorMessage,
} from '@frontegg/react-core';

const stateMapper = ({ loginState, isSSOAuth, onRedirectTo, routes }: AuthState) => ({ loginState, isSSOAuth, onRedirectTo, routes });
const actionsMapper = ({ preLogin, login, setLoginState, resetLoginState, setForgotPasswordState }: AuthActions) => ({
  preLogin,
  login,
  setLoginState,
  resetLoginState,
  setForgotPasswordState,
});


export interface LoginWithPasswordProps {
  renderer?: RendererFunction<Props, LoginWithPasswordProps>
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & LoginWithPasswordProps

class LoginWithPasswordComponent extends React.Component<Props> {
  backToPreLogin = () => this.props.setLoginState({ step: LoginStep.preLogin });


  render() {
    const {
      renderer, t, loginState: { loading, step, error }, isSSOAuth, preLogin, login,
      setForgotPasswordState, resetLoginState, onRedirectTo, routes,
    } = this.props;

    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']));
    }

    const shouldDisplayPassword = !isSSOAuth || step === LoginStep.loginWithPassword;
    const shouldBackToLoginIfEmailChanged = isSSOAuth && shouldDisplayPassword;
    const validationSchema: any = { email: validateEmail(t) };
    if (shouldDisplayPassword) {
      validationSchema.password = validatePassword(t);
    }

    return <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validateSchema(validationSchema)}
      onSubmit={shouldDisplayPassword ?
        ({ email, password }) => login({ email, password }) :
        ({ email }) => preLogin({ email })
      }>
      {({ values }) => <Form inFormik>
        <Input
          inFormik={true}
          fullWidth={true}
          name='email'
          label={t('auth.login.email')}
          placeholder='name@example.com'
          onChange={shouldBackToLoginIfEmailChanged ? this.backToPreLogin : undefined}/>


        {shouldDisplayPassword && <Input
          label={t('auth.login.password')}
          labelButton={{
            disabled: loading,
            testId: 'forgot-password-button',
            onClick: () => {
              setForgotPasswordState({ email: values.email });
              resetLoginState();
              onRedirectTo(routes.forgetPasswordUrl);
            },
            children: t('auth.login.forgot-password'),
          }}
          inFormik
          fullWidth
          type='password'
          name='password'
          placeholder={t('auth.login.enter-your-password')}
          disabled={!shouldDisplayPassword}/>}

        <Button submit
                inFormik
                fullWidth={true}
                variant={'primary'}
                loading={loading}>
          {shouldDisplayPassword ? t('auth.login.login') : t('auth.login.continue')}
        </Button>

        <ErrorMessage error={error}/>
      </Form>
      }
    </Formik>;
  }
}

export const LoginWithPassword = withAuth(withT()(LoginWithPasswordComponent), stateMapper, actionsMapper);
