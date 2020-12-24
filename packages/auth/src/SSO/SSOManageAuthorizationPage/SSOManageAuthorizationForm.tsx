import React, { FC } from 'react';
import classNames from 'classnames';
import { useT, FFormik, FForm } from '@frontegg/react-core';
import { useAuthSSOActions, useAuthSSOState } from '../hooks';
import { SSOManageAuthorizationSelect } from './SSOManageAuthorizationSelect';

const { Formik } = FFormik;

export const SSOManageAuthorizationForm: FC = () => {
  const { authorizationRoles } = useAuthSSOState(({ authorizationRoles }) => ({ authorizationRoles }));
  const { updateSSOAuthorizationRoles } = useAuthSSOActions();

  return (
    <div className={classNames('fe-sso-authorization-page__form')}>
      <Formik
        initialValues={{ authorizationRoles: authorizationRoles || [] }}
        onSubmit={({ authorizationRoles }, { resetForm }) => {
          const callback = () => resetForm({ values: { authorizationRoles } });
          updateSSOAuthorizationRoles({ callback, authorizationRoles });
        }}
      >
        <FForm>
          <SSOManageAuthorizationSelect />
        </FForm>
      </Formik>
    </div>
  );
};
