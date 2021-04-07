import React, { FC, useEffect, useRef, useState } from 'react';
import { FFormik, FForm, Grid, useT } from '@frontegg/react-core';
import { HideOption } from '../../interfaces';
import { SSOConfigureIDPStep1, SSOConfigureIDPStep2 } from './SSOConfigureIDPSteps';
import { useSSOActions, useSSOState } from '@frontegg/react-hooks/auth';
import { SamlVendors } from './SSOVendors';
import { ssoConfigureIdpFormValidation, ssoConfigureIdpFormSubmit } from '../helpers';

const { Formik } = FFormik;

export interface HeaderProps {
  step: number;
}

const prefixT = 'auth.sso.idp.form';
const Title: FC = (props) => {
  const { t } = useT();
  const children = props.children ?? t(`${prefixT}.title`);
  return <div className='fe-sso-idp-page__title fe-mb-1'>{children}</div>;
};

const Header: FC<HeaderProps> = (props) => {
  const { t } = useT();
  const children = props.children ?? <Title />;
  return (
    <Grid container className='fe-sso-idp-page__config-header'>
      <Grid item xs>
        {children}
      </Grid>
      <Grid item className='fe-sso-idp-page__config-header-step'>
        {`${t(`common.step`, { num: props.step })}`}
      </Grid>
    </Grid>
  );
};

const Progress = ({ step }: { step: number }) => {
  return <div className={`fe-sso-idp-page__progress-${step}`} />;
};

export interface IInitialValues {
  ssoEndpoint?: string;
  configSaml: string;
  configFile?: File[];
  signRequest?: boolean;
  publicCertificate?: string;
  oidcClientId?: string;
  oidcSecret?: string;
}

const initialValues: IInitialValues = {
  configSaml: 'manual',
  ssoEndpoint: '',
  publicCertificate: '',
};

const initialOidcValues: IInitialValues = {
  configSaml: 'manual',
  oidcSecret: '',
  oidcClientId: '',
};

export interface SSOConfigureIDPFormProps {
  samlVendor: SamlVendors;
}

export const SSOConfigureIDPForm: FC<HideOption & SSOConfigureIDPFormProps> = ({ samlVendor }) => {
  const [step, goToStep] = useState(1);
  const { samlConfiguration, saving } = useSSOState(({ samlConfiguration, saving }) => ({
    samlConfiguration,
    saving,
  }));
  const { saveSSOConfigurations, saveSSOConfigurationsFile } = useSSOActions();
  const { t } = useT();
  const formikRef = useRef<FFormik.FormikProps<IInitialValues>>(null);
  const initValues = samlVendor === 'Oidc' ? initialOidcValues : initialValues;

  useEffect(() => formikRef.current?.setSubmitting?.(!!saving), [saving, formikRef]);
  useEffect(() => goToStep(1), [initValues]);

  return (
    <div className='fe-sso-idp-page__config'>
      <Header step={step} />
      <Progress step={step} />
      <Formik
        innerRef={formikRef}
        initialValues={{
          ...initValues,
          ...samlConfiguration,
        }}
        enableReinitialize
        validate={(values) =>
          ssoConfigureIdpFormValidation({
            ...values,
            samlVendor,
            t,
          })
        }
        onSubmit={(values) =>
          ssoConfigureIdpFormSubmit({
            ...values,
            saveSSOConfigurationsFile,
            saveSSOConfigurations,
            samlVendor,
          })
        }
      >
        <FForm>
          {step === 1 && <SSOConfigureIDPStep1 samlVendor={samlVendor} goToStep={goToStep} />}
          {step === 2 && <SSOConfigureIDPStep2 samlVendor={samlVendor} goToStep={goToStep} />}
        </FForm>
      </Formik>
    </div>
  );
};
