import React, { FC, ReactElement, useMemo } from 'react';
import { Icon, useT } from '@frontegg/react-core';
import { SamlVendors } from './SSOVendors';

const prefixT = 'auth.sso.idp.guide';

type StepsProps = {
  samlVendor?: SamlVendors;
  children?: ReactElement;
};

export const Steps: FC<StepsProps> = (props) => {
  const { samlVendor } = props;
  const { t } = useT();
  const steps = useMemo(() => {
    switch (samlVendor) {
      case 'Oidc':
        return [
          t(`${prefixT}.oidc.steps-0`),
          t(`${prefixT}.oidc.steps-1`),
          t(`${prefixT}.oidc.steps-2`),
          t(`${prefixT}.oidc.steps-3`),
          t(`${prefixT}.oidc.steps-4`),
          t(`${prefixT}.oidc.steps-5`),
        ];
      default:
        return [
          t(`${prefixT}.steps-0`),
          t(`${prefixT}.steps-1`),
          t(`${prefixT}.steps-2`),
          t(`${prefixT}.steps-3`),
          t(`${prefixT}.steps-4`),
        ];
    }
  }, [samlVendor]);

  const children = props.children ?? <Step />;
  return (
    <div className='fe-sso-guide__steps'>
      {steps?.map((step, i) => React.cloneElement(children, { key: i, children: <>{step}</> }))}
    </div>
  );
};
export const Step: FC = ({ children }) => {
  return (
    <div className='fe-sso-guide__step'>
      <Icon name='right-arrow' />
      <span>{children}</span>
    </div>
  );
};
