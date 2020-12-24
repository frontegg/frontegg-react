import React, { FC, ReactElement, useState } from 'react';
import { Icon, useT } from '@frontegg/react-core';
import { SamlVendors } from './SSOVendors';
import { SSODialogInstruction } from './SSODialogInstruction';
import { Steps, Step } from './SSOConfigureIDPGuideSteps';
const prefixT = 'auth.sso.idp.guide';

type StepsProps = {
  samlVendor?: SamlVendors;
  children?: ReactElement;
};

const Title: FC<StepsProps> = (props) => {
  const { t } = useT();
  const children = props.children ?? `${t(`${prefixT}.title`)} (${props.samlVendor})`;
  return <div className='fe-sso-idp-page__title fe-mb-1'>{children}</div>;
};
const Description: FC = (props) => {
  const { t } = useT();
  const children = props.children ?? t(`${prefixT}.description`);
  return <div className='fe-sso-guide__description fe-mb-2'>{children}</div>;
};

export type SSOClaimDomainGuideProps = {
  title?: string;
  description?: string;
  steps?: string[];
  samlVendor: SamlVendors;
};

type SubComponents = {
  Title: typeof Title;
  Description: typeof Description;
  Steps: typeof Steps;
  Step: typeof Step;
};

const SSOConfigureIDPGuide: FC<SSOClaimDomainGuideProps> & SubComponents = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useT();
  const onCloseModel = () => setModalOpen(false);

  const children = props.children ?? (
    <>
      <Title samlVendor={props.samlVendor} />
      <Description />
      <Steps samlVendor={props.samlVendor} />
      <div className='fe-flex-spacer' />

      {props.samlVendor !== SamlVendors.Saml && props.samlVendor !== SamlVendors.Oidc && (
        <>
          <div className='fe-sso-guide__see-more'>
            {t(`${prefixT}.step-by-step`)}{' '}
            <div
              onClick={() => {
                setModalOpen(true);
              }}
            >
              {t('common.instruction')} <Icon className='fe-ml-1' name='right-arrow' />
            </div>
          </div>
          <SSODialogInstruction samlVendor={props.samlVendor} open={modalOpen} onClose={onCloseModel} />
        </>
      )}
    </>
  );

  return <div className='fe-sso-guide'>{children}</div>;
};

SSOConfigureIDPGuide.Title = Title;
SSOConfigureIDPGuide.Description = Description;
SSOConfigureIDPGuide.Steps = Steps;
SSOConfigureIDPGuide.Step = Step;

export { SSOConfigureIDPGuide };
