import React, { FC, useEffect, useRef, useState } from 'react';
import {
  FFormik,
  FForm,
  Grid,
  useT,
  validateSchema,
  validateUrl,
  validateLength,
  validateRequired,
  validateSchemaSync,
} from '@frontegg/react-core';
import { HideOption } from '../../interfaces';
import { SSOConfigureIDPStep1, SSOConfigureIDPStep2 } from './SSOConfigureIDPSteps';
import { useAuth } from '../../hooks';

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
}

const initialValues: IInitialValues = {
  configSaml: 'manual',
};

export const SSOConfigureIDPForm: FC<HideOption> = () => {
  const [step, goToStep] = useState(1);
  const { samlConfiguration, saveSSOConfigurations, saveSSOConfigurationsFile, saving } = useAuth(
    (state) => state.ssoState
  );
  const { t } = useT();
  const formikRef = useRef<FFormik.FormikProps<IInitialValues>>(null);

  useEffect(() => formikRef.current?.setSubmitting?.(!!saving), [saving, formikRef]);

  return (
    <div className='fe-sso-idp-page__config'>
      <Header step={step} />
      <Progress step={step} />
      <Formik
        innerRef={formikRef}
        initialValues={{
          ...initialValues,
          ...samlConfiguration,
        }}
        enableReinitialize
        validate={({ configSaml, configFile, ssoEndpoint, publicCertificate }) => {
          if (configSaml === 'auto') {
            return validateSchemaSync(
              {
                configFile: validateRequired(t('auth.sso.form.metadata-file'), t),
              },
              { configFile }
            );
          } else {
            return validateSchemaSync(
              {
                ssoEndpoint: validateUrl(t('auth.sso.idp.form.endpoint'), t),
                publicCertificate: validateRequired(t('auth.sso.idp.form.certificate'), t),
              },
              { ssoEndpoint, publicCertificate }
            );
          }
        }}
        onSubmit={({ ssoEndpoint, configSaml, publicCertificate, configFile }) => {
          if (configSaml === 'auto') {
            saveSSOConfigurationsFile(configFile!);
          } else {
            saveSSOConfigurations({
              ssoEndpoint,
              publicCertificate,
            });
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
