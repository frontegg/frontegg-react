import React, { FC } from 'react';
import classNames from 'classnames';
import { useT, FFormik, FForm } from '@frontegg/react-core';
import { useSSOActions, useSSOState } from '../hooks';
import { SSOManageAuthorizationSelect } from './SSOManageAuthorizationSelect';

const { Formik } = FFormik;

export const SSOManageAuthorizationForm: FC = () => {
  const { authorizationRoles } = useSSOState(({ authorizationRoles }) => ({ authorizationRoles }));
  const { updateSSOAuthorizationRoles } = useSSOActions();

  const prefixT = 'auth.sso.authorization';
  const Title: FC = (props) => {
    const { t } = useT();
    const children = props.children ?? t(`${prefixT}.title`);
    return <div className='fe-sso-authorization-page__title fe-mb-1'>{children}</div>;
  };

  const Subtitle: FC = (props) => {
    const { t } = useT();
    const children = props.children ?? t(`${prefixT}.subtitle`);
    return <div className='fe-sso-authorization-page__subtitle fe-mb-1'>{children}</div>;
  };

  return (
    <div className={classNames('fe-sso-authorization-page__form')}>
      <Title />
      <Subtitle />
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
