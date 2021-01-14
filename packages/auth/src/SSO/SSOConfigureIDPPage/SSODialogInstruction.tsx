import React, { FC, ReactNode, useContext, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  Button,
  Dialog,
  DialogContext,
  DialogProps,
  Grid,
  useT,
} from '@frontegg/react-core';
import { SamlVendors } from './SSOVendors';
import { useAuth } from '../../hooks';

type InstructionsAccordionProps = {
  steps: {
    text: ReactNode;
    imgs: string[];
  }[];
};
const InstructionsAccordion: FC<InstructionsAccordionProps> = (props) => {
  const { t } = useT();
  const [expanded, setExpanded] = useState(0);
  const { onClose } = useContext(DialogContext);
  return (
    <>
      {props.steps.map((step, index) => {
        const firstItem = index === 0;
        const lastItem = index === props.steps.length - 1;

        return (
          <Accordion key={index} expanded={expanded === index} onClick={() => setExpanded(index)}>
            <AccordionHeader>{t('common.step', { num: index + 1 })}</AccordionHeader>
            <AccordionContent>
              <div className='fe-sso-guide__instruction-row'>
                <div className='fe-description'>{step.text}</div>
                {step.imgs && step.imgs.map((imgUrl) => <img src={imgUrl} alt={'step' + index} />)}

                <Grid container>
                  <Grid item xs={6}>
                    {!firstItem && (
                      <Button
                        data-test-id='expand-btn'
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded(index - 1);
                        }}
                      >
                        {t('common.back')}
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={6} className='fe-text-align-end'>
                    <Button
                      data-test-id='collapseExpand-btn'
                      variant='primary'
                      onClick={(e) => {
                        e.stopPropagation();
                        lastItem ? onClose?.() : setExpanded(index + 1);
                      }}
                    >
                      {lastItem ? t('common.finish') : t('common.next')}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </AccordionContent>
          </Accordion>
        );
      })}
    </>
  );
};

const OktaInstructions = () => {
  const { samlConfiguration } = useAuth((state) => state.ssoState);
  const steps = [
    {
      text: (
        <>Navigate to your Okta admin console (make sure that the UI is set to classical and not developer console)</>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/OKTA/1.png'],
    },
    {
      text: <>Select the applications menu from the top navigation bar</>,
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/OKTA/2.png'],
    },
    {
      text: <>Search and select the SAML service provider application from the applications menu</>,
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/OKTA/3.png'],
    },
    {
      text: <>Click on the ADD application button</>,
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/OKTA/4.png'],
    },
    {
      text: (
        <>Name the application with a meaningful name (this is only for you to remember what it is) and click next</>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/OKTA/5.png'],
    },
    {
      text: (
        <>
          Download the IDP metadata XML by clicking on the <b>Identity Provider metadata</b> link
        </>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/OKTA/8.png'],
    },
    {
      text: (
        <>
          Set <u>{samlConfiguration?.acsUrl}</u> to the <b>Assertion Consumer Service URL</b> and{' '}
          <u>{samlConfiguration?.spEntityId}</u> to the <b>Service Provider Entity Id</b>
        </>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/OKTA/6.png'],
    },
    {
      text: (
        <>
          Under the <b>CREDENTIALS DETAILS</b> section set the <b>Application username format</b> to email and click
          Done
        </>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/OKTA/7.png'],
    },
  ];

  return <InstructionsAccordion steps={steps} />;
};

const AzureInstructions = () => {
  const { samlConfiguration } = useAuth((state) => state.ssoState);
  const steps = [
    {
      text: <>Navigate to your azure management portal and select Azure Active Directory from the search bar</>,
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/AzureAD/1.png'],
    },
    {
      text: (
        <>
          Select <b>Enterprise applications</b> from the left side bar
        </>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/AzureAD/2.png'],
    },
    {
      text: (
        <>
          Click on <b>New application</b>
        </>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/AzureAD/3.png'],
    },
    {
      text: (
        <>
          Select <b>Non gallery application</b>
        </>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/AzureAD/4.png'],
    },
    {
      text: (
        <>
          Enter the display name for your application (this is logical step for you to keep track on the applications)
          and click Add
        </>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/AzureAD/5.png'],
    },
    {
      text: (
        <>
          Click on <b>Set up single sign on</b> and select SAML
        </>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/AzureAD/6.png'],
    },
    {
      text: (
        <>
          Under <b>Basic SAML configuration</b> set <u>{samlConfiguration?.spEntityId}</u> as the{' '}
          <b>Identifier (Entity ID)</b>
          and <u>{samlConfiguration?.acsUrl}</u> as the <b>Reply URL (Assertion Consumer Service URL)</b> and click save
        </>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/AzureAD/7.png'],
    },
    {
      text: <>Download the Federation Metadata XML and upload it on the IDP configuration component</>,
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/AzureAD/8.png'],
    },
    {
      text: <>Under Users and Groups, associate the users allowed to login to the application</>,
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/AzureAD/9.png'],
    },
  ];

  return <InstructionsAccordion steps={steps} />;
};

const GoogleInstructions = () => {
  const { samlConfiguration } = useAuth((state) => state.ssoState);
  const steps = [
    {
      text: <>Navigate to your GSuite admin console and select Apps from the tiles menu</>,
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/GSuite/1.png'],
    },
    {
      text: <>Click on SAML apps</>,
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/GSuite/2.png'],
    },
    {
      text: <>Click on the Plus sign</>,
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/GSuite/9.png'],
    },
    {
      text: (
        <>
          On the popup select <b>Set my own custom app</b>
        </>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/GSuite/3.png'],
    },
    {
      text: <>Download the IDP metadata (we will upload it on step 2)</>,
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/GSuite/4.png'],
    },
    {
      text: <>Set the application name (this is logical for you to track the SAML applications) and click Next</>,
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/GSuite/5.png'],
    },
    {
      text: (
        <>
          Under <b>Service Provider Details</b> set <u>{samlConfiguration?.acsUrl}</u> as the{' '}
          <b>Reply URL (Assertion Consumer Service URL)</b> and <u>{samlConfiguration?.spEntityId}</u> as the{' '}
          <b>Identifier (Entity ID)</b> and click Next and Finish
        </>
      ),
      imgs: ['https://assets.frontegg.com/public-frontegg-assets/SSO/GSuite/6.png'],
    },
    {
      text: (
        <>
          Click <b>Edit service</b> and assign the relevant groups to the service
        </>
      ),
      imgs: [
        'https://assets.frontegg.com/public-frontegg-assets/SSO/GSuite/12.png',
        'https://assets.frontegg.com/public-frontegg-assets/SSO/GSuite/7.png',
      ],
    },
  ];

  return <InstructionsAccordion steps={steps} />;
};

export const SSODialogInstruction: FC<Partial<DialogProps & { samlVendor: SamlVendors }>> = (props) => {
  const { t } = useT();
  const Component = useMemo(() => {
    switch (props.samlVendor) {
      case SamlVendors.Azure:
        return AzureInstructions;
      case SamlVendors.Google:
        return GoogleInstructions;
      case SamlVendors.Okta:
        return OktaInstructions;
    }
    return () => null;
  }, [props.samlVendor]);
  return (
    <DialogContext.Provider value={{ onClose: props.onClose }}>
      <Dialog open={props.open} header={`${t('common.instruction-for')} ${props.samlVendor}`} onClose={props.onClose}>
        <Component />
      </Dialog>
    </DialogContext.Provider>
  );
};
