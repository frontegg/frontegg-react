import React, { FC } from 'react';
import { checkRootPath, Grid } from '@frontegg/react-core';
import { Route } from 'react-router-dom';
import { HideOption } from '../../interfaces';
import { Icon, useT } from '@frontegg/react-core';

export interface ItemProps {
  img: string;
  label: string;
}

const IDPS = [
  { img: 'saml', label: 'SAML' },
  { img: 'okta', label: 'Okta' },
  { img: 'azure', label: 'Azure Active Directory' },
  { img: 'google', label: 'Google Gsuite' },
];

const prefixT = 'auth.sso.idp.select';
const Title: FC = (props) => {
  const { t } = useT();
  const children = props.children ?? t(`${prefixT}.title`);
  return <div className='fe-sso-idp-page__title fe-mb-2'>{children}</div>;
};

const Item: FC<ItemProps> = ({ img, label }) => {
  return (
    <div className='fe-sso-idp-page__select-item'>
      <img />
      <div>{label}</div>
    </div>
  );
};

export const SSOConfigureIDPSelect: FC<HideOption> = () => {
  return (
    <div className='fe-sso-idp-page__select'>
      <Title />
      <div className='fe-sso-idp-page__select-container'>
        <Grid>
          {IDPS.map(({ img, label }) => (
            <Grid>
              <Item img={img} label={label} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
