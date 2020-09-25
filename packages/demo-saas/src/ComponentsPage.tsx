import React, { FC } from 'react';
import { fronteggElements as FE } from '@frontegg/react-core';
import { uiLibrary as S } from '@frontegg/react-elements-semantic';
import { uiLibrary as M } from '@frontegg/react-elements-material-ui';
import { Elements } from '@frontegg/react-core';

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
  {
    title: 'Buttons',
    type: 'Button',
    props: [
      { children: 'Regular Button' },
      { variant: 'primary', children: 'Primary Button' },
      { variant: 'secondary', children: 'Secondary Button' },
      { variant: 'danger', children: 'Danger Button' },
      { isCancel: true, children: 'Cancel Button' },
    ],
  },
];
export const ComponentsPage: FC = () => {
  return (
    <div>
      <div style={{ maxWidth: '80%', margin: '20px auto 0' }}>
        {libs.map((lib) => (
          <SubSection title={`Customize ${lib.title}`}>
            <p dangerouslySetInnerHTML={{ __html: lib.customizeNotes }} />
          </SubSection>
        ))}
      </div>
      {elements.map((elem) => (
        <Section title={elem.title}>
          {libs.map((lib) => (
            <SubSection title={lib.title}>
              {(lib.elements as any)[elem.type]
                ? elem.props.map((props) => {
                    return React.createElement((lib.elements as any)[elem.type], props);
                  })
                : `Elem ${elem.type} not found in lib ${lib.title}`}
            </SubSection>
          ))}
        </Section>
      ))}
    </div>
  );
};
