import React, { FC } from 'react';
import { Grid } from '@frontegg/react-core';
import { Icon, useT } from '@frontegg/react-core';
import { AzureIcon, GoogleIcon, OktaIcon, SamlIcon } from './SSOVendors';

export interface ItemProps {
  Icon: FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const IDPS = [
  { Icon: SamlIcon, label: 'SAML' },
  { Icon: OktaIcon, label: 'Okta' },
  { Icon: AzureIcon, label: 'Azure Active Directory' },
  { Icon: GoogleIcon, label: 'Google Gsuite' },
];

const prefixT = 'auth.sso.idp.select';
const Title: FC = (props) => {
  const { t } = useT();
  const children = props.children ?? t(`${prefixT}.title`);
  return <div className='fe-sso-idp-page__title fe-mb-2'>{children}</div>;
};

const Item: FC<ItemProps> = ({ Icon, label }) => {
  return (
    <div className='fe-sso-idp-page__select-item'>
      <Icon width='2rem' height='2rem' />
      <div>{label}</div>
    </div>
  );
};

export const SSOConfigureIDPSelect: FC = () => {
  return (
    <div className='fe-sso-idp-page__select'>
      <Title />
      <div className='fe-sso-idp-page__select-container'>
        <Grid container>
          {IDPS.map(({ Icon, label }) => (
            <Grid item xs sm={12}>
              <Item Icon={Icon} label={label} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
