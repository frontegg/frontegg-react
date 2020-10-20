import React, { FC, useState } from 'react';
import { FFormik, FForm, Grid, useT } from '@frontegg/react-core';
import { HideOption } from '../../interfaces';
import { SSOConfigureIDPStep1, SSOConfigureIDPStep2 } from './SSOConfigureIDPSteps';
import { useAuth } from '../../hooks';
import { SamlVendors } from './SSOVendors';

export interface HeaderProps {
  step: number;
}

export interface SSOConfigureIDPForm {
  samlVendor: SamlVendors;
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
  type?: SamlVendors;
  ssoEndpoint?: string;
  configSaml: string;
  configFile?: File[];
  signRequest?: boolean;
  publicCertificate?: string;
}

const initialValues: IInitialValues = {
  configSaml: 'manual',
};

export const SSOConfigureIDPForm: FC<HideOption & SSOConfigureIDPForm> = ({ samlVendor }) => {
  const [step, goToStep] = useState(1);
  const { samlConfiguration } = useAuth((state) => state.ssoState);
  const { Formik } = FFormik;

  return (
    <div className='fe-sso-idp-page__config'>
      <Header step={step} />
      <Progress step={step} />
      <Formik
        initialValues={{
          type: samlVendor,
          ...initialValues,
          ...samlConfiguration,
          signRequest: samlConfiguration?.signRequest ? 'yes' : 'no',
          configSaml: samlConfiguration?.ssoEndpoint && samlConfiguration?.publicCertificate ? 'manual' : 'auto',
        }}
        enableReinitialize
        onSubmit={({ type, ssoEndpoint, configSaml, publicCertificate, configFile, signRequest }) => {
          if (type === 'Saml') {
            if (configSaml === 'auto') {
              console.log('auto');
              // saveConfigurationsAuto({ configFile } as any);
            } else {
              // saveConfigurations({
              //   ...samlConfiguration,
              //   ssoEndpoint,
              //   configSaml,
              //   publicCertificate,
              //   signRequest: signRequest === 'yes',
              // } as any);
              console.log('auto');
            }
          }
        }}
      >
        <FForm>
          {step === 1 && <SSOConfigureIDPStep1 goToStep={goToStep} />}
          {step === 2 && <SSOConfigureIDPStep2 goToStep={goToStep} />}
        </FForm>
      </Formik>
    </div>
  );
};
