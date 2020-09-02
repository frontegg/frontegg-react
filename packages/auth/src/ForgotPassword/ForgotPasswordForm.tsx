import { withAuth } from '../HOCs';
import { Form, Button, Input, RendererFunction, validateEmail, validateSchema, WithT, withT, ErrorMessage, omitProps } from '@frontegg/react-core';
import { Formik } from 'formik';
import React from 'react';
import { AuthActions, AuthState } from '../Api';


const stateMapper = ({ forgetPasswordState }: AuthState) => ({ forgetPasswordState });
const actionsMapper = ({ forgotPassword }: AuthActions) => ({ forgotPassword });

export interface ForgotPasswordFormProps {
  renderer?: RendererFunction<Props, ForgotPasswordFormProps>
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & ForgotPasswordFormProps

class ForgotPasswordFormComponent extends React.Component<Props> {

  render() {
    const { renderer, t, forgotPassword, forgetPasswordState: { email, error, loading } } = this.props;
    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']));
    }
    return <Formik
      initialValues={{ email }}
      validationSchema={validateSchema({
        email: validateEmail(t),
      })}
      isInitialValid={validateEmail(t).isValidSync(email)}
      onSubmit={({ email }) => forgotPassword({ email })}
    >
      <Form>
        <Input
          inFormik
          defaultValue={email}
          name='email'
          placeholder='name@example.com'
          label={t('auth.forgot-password.email-label')}/>
        <Button inFormik submit fullWidth formikDisableIfNotDirty={false} variant='primary' loading={loading}>
          {t('auth.forgot-password.remind-me')}
        </Button>
        <ErrorMessage error={error}/>
      </Form>
    </Formik>;
  }
}

export const ForgotPasswordForm = withAuth(withT()(ForgotPasswordFormComponent), stateMapper, actionsMapper);
