import React, { FC, useState } from 'react';
import { Elements, fronteggElements as FE, TableFilter } from '@frontegg/react-core';
import { uiLibrary as S } from '@frontegg/react-elements-semantic';
import { uiLibrary as M } from '@frontegg/react-elements-material-ui';
import { FeTable } from '@frontegg/react-core';

const Semantic = S as Elements;
const Material = M as Elements;
const Frontegg = FE as Elements;

const Section: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className='components-section'>
      <h3>{title}</h3>
      {children}
    </div>
  );
};
const SubSection: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className='components-sub-section'>
      <h5>{title}</h5>
      {children}
    </div>
  );
};

const libs = [
  {
    title: 'Frontegg',
    elements: Frontegg,
    customizeNotes:
      'In order to customize <b>Frontegg Elements</b> your have to override the --fe-* css variables or from FronteggPortal',
  },
  {
    title: 'Semantic',
    elements: Semantic,
    customizeNotes:
      'In order to Customize <b>Semantic Elements</b> visit <a target="_blank" href="https://react.semantic-ui.com/theming">https://react.semantic-ui.com/theming</a>',
  },
  {
    title: 'Material',
    elements: Material,
    customizeNotes:
      'In order to Customize <b>Material Elements</b> visit <a target="_blank" href="https://material-ui.com/styles/advanced/">https://material-ui.com/styles/advanced/</a>',
  },
];

const elements = [
  // {
  //   title: 'Buttons',
  //   type: 'Button',
  //   props: [
  //     { children: 'Regular Button' },
  //     { variant: 'primary', children: 'Primary Button' },
  //     { variant: 'secondary', children: 'Secondary Button' },
  //     { variant: 'danger', children: 'Danger Button' },
  //     { isCancel: true, children: 'Cancel Button' },
  //   ],
  // }
];

const data = [
  {
    ip: '79.176.23.49',
    user: 'Tillie Casias',
    action: 'Accessed',
    resource: 'Audit',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:15:15.600',
    totalRows: 2250,
    searchText: 'None',
    piiReturned: 'true',
    frontegg_id: 'cc4330b6-5882-4460-a0c1-6941f1d35d86',
  },
  {
    ip: '79.176.23.49',
    user: 'Johnny Lu',
    action: 'Accessed',
    resource: 'Dashboard',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:15:15.462',
    frontegg_id: '777293f9-de88-49c4-b432-e8c853d8e648',
  },
  {
    ip: '72.28.101.231',
    user: 'Florine Pinion',
    action: 'Sanity Check Finished',
    scanId: '30eefef7-859f-4fce-9ba8-8666bc342591',
    service: 'Payments',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Attention',
    standard: 'SOC2',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:10.221',
    frontegg_id: 'e1cd9f43-505c-45fe-bd60-f712656235fa',
  },
  {
    ip: '72.92.55.231',
    user: 'Verona Gonzalas',
    action: 'Sanity Check Finished',
    scanId: '9eea13e1-a91f-47be-8378-1c076f121527',
    service: 'Cars',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Info',
    standard: 'SOC2',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:10.087',
    frontegg_id: '7545fd29-c010-41ee-8238-bb39526c8f6a',
  },
  {
    ip: '23.92.49.21',
    user: 'Melda Richert',
    action: 'Periodic Scan Finished',
    result: 'Success',
    scanId: '428454cf-faac-49b1-b3c4-d904255da224',
    service: 'Cars',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:05.124',
    frontegg_id: '62adc639-e701-4095-95a4-27cdbedf59ab',
  },
  {
    ip: '23.92.49.21',
    user: 'Rhoda Blaylock',
    action: 'Periodic Scan Finished',
    result: 'Total Failure',
    scanId: 'c96c6560-af2b-4abe-94d2-c8f2b741f6ea',
    service: 'Cars',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:05.069',
    frontegg_id: '9b83dc83-204c-433a-97ad-639279cfd5e6',
  },
  {
    ip: '25.44.49.21',
    user: 'Tillie Casias',
    action: 'Settings Modified',
    resource: 'Microservice',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.483',
    microservice: 'Payments',
    settingChanged: 'Authentication',
    frontegg_id: '0ecfa8fd-8ca0-4736-bf1a-b2a77bcc0e3e',
  },
  {
    ip: '161.185.160.93',
    user: 'Clement Gallop',
    cause: 'Service Response Lag',
    action: 'Remediated',
    scanId: '50622ae6-9156-4894-bcce-a61a015fa5a1',
    lagTime: '2500ms',
    service: 'Payments',
    resource: 'Service',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.482',
    restartTime: '2000ms',
    frontegg_id: '24a9e25f-9ca4-48c0-9c1c-17940bf2b919',
  },
  {
    ip: '161.185.160.93',
    api: 'GET /payments',
    user: 'Kieth Mason',
    action: 'Liveness Check Perfomed',
    result: 'Success',
    scanId: '96212e63-fab9-451e-a8b0-61b6d59ad8e7',
    resource: 'APIs',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.481',
    frontegg_id: 'ba814ecd-7186-44b2-ac03-f9591cac3015',
  },
  {
    ip: '25.44.49.21',
    user: 'Kieth Mason',
    action: 'Settings Modified',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.481',
    frontegg_id: '0f488824-c7af-4463-8639-2669a492c2e2',
  },
  {
    ip: '23.92.55.21',
    user: 'Tillie Casias',
    email: 'tilliecasias@example.com',
    action: 'Added',
    resource: 'Users',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.480',
    frontegg_id: '92bb449b-ab0a-4f2c-9055-1ea03a7f7d83',
  },
  {
    ip: '23.92.55.231',
    user: 'Ardelia Dismuke',
    action: 'Settings Modified',
    resource: 'Microservice',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.478',
    microservice: 'Payments',
    settingChanged: 'Authentication',
    frontegg_id: '8597d041-257d-43ce-b561-cddab37dc2b4',
  },
  {
    ip: '72.28.101.231',
    api: 'POST /products',
    user: 'Marg Lovelace',
    action: 'Liveness Check Perfomed',
    result: 'Success',
    scanId: '25638864-671a-4beb-8df8-22ce0e0b8147',
    resource: 'APIs',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.477',
    frontegg_id: '4d1ae8f7-8908-4df2-866b-0d906d14650e',
  },
  {
    ip: '3.92.49.21',
    user: 'Ardelia Dismuke',
    action: 'Lag Detected',
    result: 'Service Response Lag',
    scanId: '8da73d4b-3785-4421-a969-5fb19c7d2988',
    lagTime: '14007ms',
    service: 'Users',
    resource: 'Service',
    severity: 'Error',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.476',
    frontegg_id: '6c579ddc-5d11-4220-a0a8-52b63df762e6',
  },
  {
    ip: '35.92.49.21',
    user: 'Iris Basso',
    action: 'Security Audit Perfomed',
    scanId: '3e182f18-a295-4c05-a101-eaa9aa3cb706',
    service: 'Users',
    infoLink: 'https://owasp.org/www-project-top-ten/',
    resource: 'Cluster',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.475',
    owaspResult: 'Broken Authentication',
    frontegg_id: 'e65e397d-820d-4bc2-a91b-1b1f462255b2',
  },
  {
    ip: '3.92.49.21',
    user: 'Jennell Fant',
    action: 'Remap',
    changed: 'Amount of Services',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.475',
    frontegg_id: '44319670-695e-41ee-842e-1672e4ccb7db',
  },
  {
    ip: '72.28.55.231',
    user: 'Verona Gonzalas',
    action: 'Compliance Audit Performed',
    scanId: '375e5feb-e0d8-4c8c-98d2-c06a5862f617',
    service: 'Payments',
    infoLink: 'https://iapp.org/news/a/understanding-data-processors-iso-and-soc-2-credentials-for-gdpr-compliance/',
    resource: 'Cluster',
    severity: 'Attention',
    standard: 'SOC2',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.474',
    frontegg_id: 'f4227fd6-3474-4fc2-94ee-5b172365c977',
  },
  {
    ip: '72.92.55.231',
    user: 'Naida Rinker',
    action: 'Security Audit Perfomed',
    scanId: 'c4cd62f4-9d20-4773-bcde-eaba9a6208d9',
    service: 'Users',
    infoLink: 'https://owasp.org/www-project-top-ten/',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.473',
    owaspResult: 'Broken Authentication',
    frontegg_id: '4dd797b7-8e52-4a82-a235-b338ce0afb0a',
  },
  {
    ip: '23.92.49.21',
    info: '/insights#scan-id',
    user: 'Florine Pinion',
    action: 'Sanity Check Started',
    failed: '2 Tests',
    scanId: '30eefef7-859f-4fce-9ba8-8666bc342591',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Attention',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.472',
    succeeded: '42 Tests',
    testsPerfomed: '44 tests',
    frontegg_id: 'dce52fbf-799a-4a8f-9c17-5ed382df8e52',
  },
  {
    ip: '72.28.55.231',
    user: 'Debora Coddington',
    action: 'Remap',
    changed: 'Security Level',
    cluster: 'Main',
    resource: 'Cluster',
    severity: 'Info',
    tenantId: 'my-tenant-id',
    vendorId: '93447df4-edcc-45e5-8664-9fb8c196cf44',
    createdAt: '2020-09-28 00:00:01.471',
    frontegg_id: 'b9bccc42-e440-4b3f-9dc2-0b54b7c721ae',
  },
];
export const ComponentsPage: FC = () => {
  const [filters, setFilters] = useState<TableFilter[]>([]);
  return (
    <div>
      {/*<div style={{ maxWidth: '80%', margin: '20px auto 0' }}>*/}
      {/*  {libs.map((lib) => (*/}
      {/*    <SubSection title={`Customize ${lib.title}`}>*/}
      {/*      <p dangerouslySetInnerHTML={{ __html: lib.customizeNotes }} />*/}
      {/*    </SubSection>*/}
      {/*  ))}*/}
      {/*</div>*/}
      {/*{elements.map((elem) => (*/}
      {/*  <Section title={elem.title}>*/}
      {/*    {libs.map((lib) => (*/}
      {/*      <SubSection title={lib.title}>*/}
      {/*        {(lib.elements as any)[elem.type]*/}
      {/*          ? elem.props.map((props) => {*/}
      {/*              return React.createElement((lib.elements as any)[elem.type], props);*/}
      {/*            })*/}
      {/*          : `Elem ${elem.type} not found in lib ${lib.title}`}*/}
      {/*      </SubSection>*/}
      {/*    ))}*/}
      {/*  </Section>*/}
      {/*))}*/}

      <FeTable
        columns={[
          { accessor: 'user', Header: 'User', sortable: true },
          { accessor: 'createdAt', Header: 'Time', Filter: () => <div>SS</div> },
        ]}
        data={data}
        filters={filters}
        onFilterChange={(_filters) => {
          console.log('sss', _filters);
          setFilters(_filters);
        }}
      />
    </div>
  );
};
