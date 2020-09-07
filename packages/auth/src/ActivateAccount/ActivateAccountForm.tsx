import React, { ComponentType } from 'react';
import { AuthActions, AuthState } from '../Api';
import { Formik } from 'formik';
import {
  Form,
  Button,
  Input,
  omitProps,
  RendererFunction,
  validatePassword,
  validatePasswordConfirmation,
  validateSchema,
  WithT,
  ErrorMessage,
} from '@frontegg/react-core';
import { withAuth } from '../HOCs';

const stateMapper = ({ activateState }: AuthState) => ({ activateState });
const actionsMapper = ({ activateAccount }: AuthActions) => ({ activateAccount });

export interface ActivateAccountFormProps {
  renderer?: RendererFunction<Props, ActivateAccountFormProps>;
  userId: string;
  token: string;
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & ActivateAccountFormProps;

class ActivateAccountFormComponent extends React.Component<Props> {
  render() {
    const {
      t,
      renderer,
      activateState: { loading, error },
      activateAccount,
      userId,
      token,
    } = this.props;

    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']));
    }

    return (
      <Formik
        validationSchema={validateSchema({
          password: validatePassword(t),
          confirmPassword: validatePasswordConfirmation(t),
        })}
        enableReinitialize={true}
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={({ password }) => activateAccount({ userId, token, password })}
      >
        <Form>
          <Input
            inFormik
            type='password'
            name='password'
            label={t('auth.activate-account.new-password')}
            placeholder={t('auth.activate-account.enter-your-password')}
          />
          <Input
            inFormik
            type='password'
            name='confirmPassword'
            label={t('auth.activate-account.confirm-new-password')}
            placeholder={t('auth.activate-account.enter-your-password-again')}
          />
          <Button inFormik type='submit' fullWidth={true} loading={loading} variant='primary'>
            {t('auth.activate-account.activate-account-button')}
          </Button>
          <ErrorMessage error={error} />
        </Form>
      </Formik>
    );
  }
}

export const ActivateAccountForm = withAuth(ActivateAccountFormComponent, stateMapper, actionsMapper) as ComponentType<
  ActivateAccountFormProps
>;
