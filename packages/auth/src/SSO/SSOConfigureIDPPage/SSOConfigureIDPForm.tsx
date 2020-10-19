import React, { FC } from 'react';
import { checkRootPath, Grid, useT, Input } from '@frontegg/react-core';
import { HideOption } from '../../interfaces';

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
    <div className='fe-sso-idp-page__config-header'>
      <Grid container justifyContent='space-between'>
        {children}
        <div className='fe-sso-idp-page__config-header-step'>{`${t(`${prefixT}.step`)} ${props.step}`}</div>
      </Grid>
    </div>
  );
};

export const SSOConfigureIDPForm: FC<HideOption> = () => {
  return (
    <div className='fe-sso-idp-page__config'>
      <Header step={1} />
    </div>
  );
};
