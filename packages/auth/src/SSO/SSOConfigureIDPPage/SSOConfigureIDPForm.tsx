import React, { FC, useState } from 'react';
import { Grid, useT } from '@frontegg/react-core';
import { HideOption } from '../../interfaces';
import { SSOConfigureIDPStep1, SSOConfigureIDPStep2 } from './SSOConfigureIDPSteps';

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

export const SSOConfigureIDPForm: FC<HideOption> = () => {
  const [step, goToStep] = useState(1);
  return (
    <div className='fe-sso-idp-page__config'>
      <Header step={step} />
      <Progress step={step} />

      {step === 1 && <SSOConfigureIDPStep1 goToStep={goToStep} />}
      {step === 2 && <SSOConfigureIDPStep2 goToStep={goToStep} />}
    </div>
  );
};
