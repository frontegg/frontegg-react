import React, { FC, ReactElement } from 'react';
import { Icon, useT } from '@frontegg/react-core';

const prefixT = 'auth.sso.idp.guide';

const Title: FC = (props) => {
  const { t } = useT();
  const children = props.children ?? t(`${prefixT}.title`);
  return <div className='fe-sso-idp-page__title fe-mb-1'>{children}</div>;
};
const Description: FC = (props) => {
  const { t } = useT();
  const children = props.children ?? t(`${prefixT}.description`);
  return <div className='fe-sso-guide__description fe-mb-2'>{children}</div>;
};

type StepsProps = (props: { children: ReactElement }) => ReactElement | null;
const Steps: StepsProps = (props) => {
  const { t } = useT();
  const steps = [
    t(`${prefixT}.steps-0`),
    t(`${prefixT}.steps-1`),
    t(`${prefixT}.steps-2`),
    t(`${prefixT}.steps-3`),
    t(`${prefixT}.steps-4`),
  ];
  const children = props.children ?? <Step />;
  return (
    <div className='fe-sso-guide__steps'>
      {steps?.map((step, i) => React.cloneElement(children, { key: i, children: <>{step}</> }))}
    </div>
  );
};

const Step: FC = ({ children }) => {
  return (
    <div className='fe-sso-guide__step'>
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

const SSOConfigureIDPGuide: FC<SSOClaimDomainGuideProps> & SubComponents = (props) => {
  const children = props.children ?? (
    <>
      <Title />
      <Description />
      <Steps>
        <Step />
      </Steps>
    </>
  );

  return <div className='fe-sso-guide'>{children}</div>;
};

SSOConfigureIDPGuide.Title = Title;
SSOConfigureIDPGuide.Description = Description;
SSOConfigureIDPGuide.Steps = Steps;
SSOConfigureIDPGuide.Step = Step;

export { SSOConfigureIDPGuide };
