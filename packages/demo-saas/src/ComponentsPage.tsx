import React, { FC, useState } from 'react';
import { Elements, fronteggElements as FE } from '@frontegg/react-core';
import { uiLibrary as S } from '@frontegg/react-elements-semantic';
import { uiLibrary as M } from '@frontegg/react-elements-material-ui';

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

interface Library {
  title: string;
  elements: Elements;
  customizeNotes: string;
}

const libs: Library[] = [
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

const elements: {
  type: string;
  title: string;
  props: any[];
}[] = [
    {
      title: 'Buttons',
      type: 'Button',
      props: [
        { children: 'Regular Button' },
        { variant: 'default', children: 'Default Button' },
        { variant: 'primary', children: 'Primary Button' },
        { variant: 'secondary', children: 'Secondary Button' },
        { variant: 'danger', children: 'Danger Button' },
        { isCancel: true, children: 'Cancel Button' },
        { fullWidth: true, children: 'Full Width Button' },
        { size: 'small', children: 'Small Button' },
        { size: 'medium', children: 'Medium Button' },
        { size: 'large', children: 'Large Button' },
        { disabled: true, children: 'Disabled Button' },
        { loading: true, children: 'Loading Button' },
      ],
    },
    {
      title: 'Checkbox',
      type: 'Checkbox',
      props: [
        { label: 'Inline Checkbox 1' },
        { label: 'Inline Checkbox 2' },
        { label: 'Indeterminate Checkbox', indeterminate: true },
        { label: 'FullWidth', fullWidth: true },
      ],
    },
    {
      title: 'Tags',
      type: 'Tag',
      props: [
        { children: 'Some Tag' },
        { children: 'Primary Tag', variant: 'primary' },
        { children: 'Secondary Tag', variant: 'secondary' },
        { children: 'Danger Tag', variant: 'danger' },
        { children: 'Default Tag', variant: 'default' },
        { children: 'Clickable Tag', onClick: console.log },
        { children: 'Disabled Tag', disabled: true },
        { children: 'Delete Tag', onDelete: console.log },
      ],
    },
    {
      title: 'Loaders',
      type: 'Loader',
      props: [
        { variant: 'default', children: null },
        { variant: 'primary', children: null },
        { variant: 'secondary', children: null },
        { variant: 'danger', children: null },
      ],
    },
  ];

const AccordionByLib: FC<{ lib: Library }> = ({ lib }) => {
  const [open, setOpen] = useState(false);

  const { Accordion, AccordionContent, AccordionHeader, Icon } = lib.elements;

  if (!Accordion || !AccordionContent || !AccordionHeader)
    return <>{`Elem Accordion not found in lib ${lib.title}`}</>;

  return (
    <>
      <Accordion expanded={open} onChange={setOpen}>
        <AccordionHeader>
          Controlled
        </AccordionHeader>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ab sint necessitatibus ut natus aut reprehenderit iste delectus illum. Placeat, consequatur quis libero praesentium ea repellendus tempora necessitatibus commodi vitae?
        </AccordionContent>
      </Accordion>
      <Accordion>
        <AccordionHeader>
          Uncontrolled
        </AccordionHeader>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ab sint necessitatibus ut natus aut reprehenderit iste delectus illum. Placeat, consequatur quis libero praesentium ea repellendus tempora necessitatibus commodi vitae?
        </AccordionContent>
      </Accordion>
      <Accordion expanded={open} onChange={setOpen}>
        <AccordionHeader>
          Controlled 2
        </AccordionHeader>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ab sint necessitatibus ut natus aut reprehenderit iste delectus illum. Placeat, consequatur quis libero praesentium ea repellendus tempora necessitatibus commodi vitae?
        </AccordionContent>
      </Accordion>
      <Accordion disabled>
        <AccordionHeader>
          Disabled
        </AccordionHeader>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ab sint necessitatibus ut natus aut reprehenderit iste delectus illum. Placeat, consequatur quis libero praesentium ea repellendus tempora necessitatibus commodi vitae?
        </AccordionContent>
      </Accordion>
      {Icon && <Accordion>
        <AccordionHeader expandIcon={<Icon name='down-arrow' />}>
          Header Icon
        </AccordionHeader>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ab sint necessitatibus ut natus aut reprehenderit iste delectus illum. Placeat, consequatur quis libero praesentium ea repellendus tempora necessitatibus commodi vitae?
        </AccordionContent>
      </Accordion>}
    </>
  )
}

export const ComponentsPage: FC = () => {

  return (
    <div>
      {/*<div style={{ maxWidth: '80%', margin: '20px auto 0' }}>*/}
      {/*  {libs.map((lib) => (*/}
      {/*    <SubSection key={lib.title} title={`Customize ${lib.title}`}>*/}
      {/*      <p dangerouslySetInnerHTML={{ __html: lib.customizeNotes }} />*/}
      {/*    </SubSection>*/}
      {/*  ))}*/}
      {/*</div>*/}
      <Section title="Accordions">
        {libs.map(lib =>
          <SubSection key={lib.title} title={lib.title} >
            <AccordionByLib lib={lib} />
          </SubSection>
        )}
      </Section>
      {elements.map((elem) => (
        <Section key={elem.title} title={elem.title}>
          {libs.map((lib) => (
            <SubSection key={lib.title} title={lib.title}>
              {(lib.elements as any)[elem.type]
                ? (elem.props as any).map((props: any, index: any) => {
                  return React.createElement((lib.elements as any)[elem.type], { ...props, key: index });
                })
                : `Elem ${elem.type} not found in lib ${lib.title}`}
            </SubSection>
          ))}
        </Section>
      ))}
    </div>
  );
};
