import React, { FC } from 'react';
import { Grid } from '@frontegg/react-core';
import { Icon, useT } from '@frontegg/react-core';
import { AzureIcon, GoogleIcon, OktaIcon, SamlIcon, SamlVendors } from './SSOVendors';
import { useAuth } from '../../hooks';
import classNames from 'classnames';

export interface SSOConfigureIDPSelectProps {
  samlVendor: SamlVendors;
  setSamlVendor: (key: SamlVendors) => void;
}

type ItemProps = {
  Icon: FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  selected: boolean;
  onClick: () => void;
};

const IDPS = [
  { Icon: SamlIcon, key: SamlVendors.Saml, label: 'SAML' },
  { Icon: OktaIcon, key: SamlVendors.Okta, label: 'Okta' },
  { Icon: AzureIcon, key: SamlVendors.Azure, label: 'Azure Active Directory' },
  { Icon: GoogleIcon, key: SamlVendors.Google, label: 'Google Gsuite' },
];

const prefixT = 'auth.sso.idp.select';
const Title: FC = (props) => {
  const { t } = useT();
  const children = props.children ?? t(`${prefixT}.title`);
  return <div className='fe-sso-idp-page__title fe-mb-2'>{children}</div>;
};

const Item: FC<ItemProps> = ({ Icon, label, selected, onClick }) => {
  return (
    <div className={classNames('fe-sso-idp-page__select-item', { selected })} onClick={onClick}>
      <Icon width='2.5rem' height='2.5rem' />
      <div className='fe-ml-2'>{label}</div>
    </div>
  );
};

export const SSOConfigureIDPSelect: FC<SSOConfigureIDPSelectProps> = (props) => {
  const { samlVendor, setSamlVendor } = props;
  return (
    <div className='fe-sso-idp-page__select'>
      <Title />
      <div className='fe-sso-idp-page__select-container'>
        <Grid container spacing={2}>
          {IDPS.map(({ Icon, key, label }) => (
            <Grid key={key} item xs={6} sm={12}>
              <Item Icon={Icon} label={label} selected={samlVendor === key} onClick={() => setSamlVendor(key)} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
