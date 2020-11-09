import React, { FC } from 'react';
import { FFormik, FInput, useT, validateEmail, validatePassword, validateSchema } from '@frontegg/react-core';
import { useAuth } from '@frontegg/react-auth';

export const LoginPage: FC = () => {
  const { t } = useT();
  const { loading, error, login } = useAuth((state) => state.loginState);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='my-login-screen'>
      <FFormik.Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validateSchema({
          email: validateEmail(t),
          password: validatePassword(t),
        })}
        onSubmit={(values) => {
          login(values);
        }}
      >
        <FFormik.Form>
          <FInput name='email' placeholder='Enter email' />
          <FInput name='password' type='password' placeholder='Enter Password' />

          {error && <div>ERROR: {error}</div>}
          <button type='submit'>Login</button>
        </FFormik.Form>
      </FFormik.Formik>
    </div>
  );
};
