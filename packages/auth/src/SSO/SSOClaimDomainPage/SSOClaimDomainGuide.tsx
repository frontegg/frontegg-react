import React, { FC, ReactElement } from 'react';
import { Icon, useT } from '@frontegg/react-core';

const transPrefix = 'auth.sso.claim-domain.guide';

const Title: FC = (props) => {
  const { t } = useT();
  const children = props.children ?? t(`${transPrefix}.title`);
  return <div className='fe-sso-claim-domain-guide__title fe-mb-1'>{children}</div>;
};
const Description: FC = (props) => {
  const { t } = useT();
  const children = props.children ?? t(`${transPrefix}.description`);
  return <div className='fe-sso-claim-domain-guide__description fe-mb-2'>{children}</div>;
};

type StepsProps = (props: { children: ReactElement }) => ReactElement | null;
const Steps: StepsProps = (props) => {
  const { t } = useT();
  const steps = [
    t(`${transPrefix}.steps-0`),
    t(`${transPrefix}.steps-1`),
    t(`${transPrefix}.steps-2`),
    t(`${transPrefix}.steps-3`),
  ];
  const children = props.children ?? <Step />;
  return (
    <div className='fe-sso-claim-domain-guide__steps'>
      {steps?.map((step, i) => React.cloneElement(children, { key: i, children: <>{step}</> }))}
    </div>
  );
};

const Step: FC = ({ children }) => {
  return (
    <div className='fe-sso-claim-domain-guide__step'>
      <Icon name='right-arrow' />
      <span>{children}</span>
    </div>
  );
};

export type SSOClaimDomainGuideProps = {
  title?: string;
  description?: string;
  steps?: string[];
};

type SubComponents = {
  Title: typeof Title;
  Description: typeof Description;
  Steps: typeof Steps;
  Step: typeof Step;
};

const SSOClaimDomainGuide: FC<SSOClaimDomainGuideProps> & SubComponents = (props) => {
  const children = props.children ?? (
    <>
      <Title />
      <Description />
      <Steps>
        <Step />
      </Steps>
    </>
  );

  return <div className='fe-sso-claim-domain-guide'>{children}</div>;
};

SSOClaimDomainGuide.Title = Title;
SSOClaimDomainGuide.Description = Description;
SSOClaimDomainGuide.Steps = Steps;
SSOClaimDomainGuide.Step = Step;

export { SSOClaimDomainGuide };
