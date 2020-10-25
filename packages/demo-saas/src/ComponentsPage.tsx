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
  propsOptions: { [prop: string]: any[] };
}[] = [
  {
    title: 'Inputs',
    type: 'Input',
    propsOptions: {
      variant: [undefined, 'default', 'primary', 'secondary', 'danger'],
      fullWidth: [false, true],
      error: [undefined, 'Some error'],
      size: ['medium', 'small', 'large'],
      disabled: [false, true],
      label: [undefined, 'Some label'],
      type: [undefined, 'text', 'password', 'search'],
      multi: [false, true],
      inForm: [false, true],
      labelButton: [undefined, { children: 'label button' }],
      placeholder: ['Placeholder'],
    },
  },
  {
    title: 'Buttons',
    type: 'Button',
    propsOptions: {
      children: ['Button'],
      variant: [undefined, 'default', 'primary', 'secondary', 'danger'],
      isCancel: [false, true],
      fullWidth: [false, true],
      size: ['medium', 'small', 'large'],
      disabled: [false, true],
      loading: [false, true],
    },
  },
  {
    title: 'Checkbox',
    type: 'Checkbox',
    propsOptions: {
      label: ['Inline Checkbox 1', 'Inline Checkbox 2'],
      indeterminate: [false, true],
      fullWidth: [false, true],
    },
  },
  {
    title: 'Tags',
    type: 'Tag',
    propsOptions: {
      children: ['Tag', 'Some Long Tag'],
      variant: [undefined, 'default', 'primary', 'secondary', 'danger'],
      disabled: [false, true],
      size: ['medium', 'small', 'large'],
      onClick: [undefined, () => {}],
      onDelete: [undefined, () => {}],
    },
  },
  {
    title: 'Loaders',
    type: 'Loader',
    propsOptions: {
      variant: [undefined, 'default', 'primary', 'secondary', 'danger'],
      center: [false, true],
    },
  },
  {
    title: 'SwitchToggles',
    type: 'SwitchToggle',
    propsOptions: {
      labels: [['Disabled', 'Enabled']],
    },
  },
];

const AccordionByLib: FC<{ lib: Library }> = ({ lib }) => {
  const [open, setOpen] = useState(false);

  const { Accordion, AccordionContent, AccordionHeader, Icon } = lib.elements;

  if (!Accordion || !AccordionContent || !AccordionHeader) return <>{`Elem Accordion not found in lib ${lib.title}`}</>;

  return (
    <>
      <Accordion expanded={open} onChange={setOpen}>
        <AccordionHeader>Controlled</AccordionHeader>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ab sint necessitatibus ut natus aut
          reprehenderit iste delectus illum. Placeat, consequatur quis libero praesentium ea repellendus tempora
          necessitatibus commodi vitae?
        </AccordionContent>
      </Accordion>
      <Accordion>
        <AccordionHeader>Uncontrolled</AccordionHeader>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ab sint necessitatibus ut natus aut
          reprehenderit iste delectus illum. Placeat, consequatur quis libero praesentium ea repellendus tempora
          necessitatibus commodi vitae?
        </AccordionContent>
      </Accordion>
      <Accordion expanded={open} onChange={setOpen}>
        <AccordionHeader>Controlled 2</AccordionHeader>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ab sint necessitatibus ut natus aut
          reprehenderit iste delectus illum. Placeat, consequatur quis libero praesentium ea repellendus tempora
          necessitatibus commodi vitae?
        </AccordionContent>
      </Accordion>
      <Accordion disabled>
        <AccordionHeader>Disabled</AccordionHeader>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ab sint necessitatibus ut natus aut
          reprehenderit iste delectus illum. Placeat, consequatur quis libero praesentium ea repellendus tempora
          necessitatibus commodi vitae?
        </AccordionContent>
      </Accordion>
      {Icon && (
        <Accordion>
          <AccordionHeader expandIcon={<Icon name='down-arrow' />}>Header Icon</AccordionHeader>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ab sint necessitatibus ut natus aut
            reprehenderit iste delectus illum. Placeat, consequatur quis libero praesentium ea repellendus tempora
            necessitatibus commodi vitae?
          </AccordionContent>
        </Accordion>
      )}
    </>
  );
};

const initialState: {
  [elementType: string]: {
    [elementProp: string]: any;
  };
} = elements.reduce(
  (aggElem, currElem) => ({
    ...aggElem,
    [currElem.type]: Object.keys(currElem.propsOptions).reduce(
      (aggProp, currProp) => ({
        ...aggProp,
        [currProp]: currElem.propsOptions[currProp][0],
      }),
      {}
    ),
  }),
  {}
);

export const ComponentsPage: FC = () => {
  const [state, setState] = useState(initialState);

  return (
    <div>
      {/*<div style={{ maxWidth: '80%', margin: '20px auto 0' }}>*/}
      {/*  {libs.map((lib) => (*/}
      {/*    <SubSection key={lib.title} title={`Customize ${lib.title}`}>*/}
      {/*      <p dangerouslySetInnerHTML={{ __html: lib.customizeNotes }} />*/}
      {/*    </SubSection>*/}
      {/*  ))}*/}
      {/*</div>*/}
      <Section title='Accordions'>
        {libs.map((lib) => (
          <SubSection key={lib.title} title={lib.title}>
            <AccordionByLib lib={lib} />
          </SubSection>
        ))}
      </Section>

      {elements.map((elem) => (
        <Section key={elem.title} title={elem.title}>
          {Object.keys(elem.propsOptions).map((prop, index) => (
            <div style={{ display: 'inline-block' }} key={index}>
              {React.createElement(libs[2].elements.Select, {
                label: prop,
                fullWidth: false,
                value: state[elem.type][prop],
                getOptionLabel: (_) => `${_.label || _}`,
                options: elem.propsOptions[prop]
                  .filter((_) => _ !== undefined)
                  .map((option) => ({ label: `${option}`, value: option })),
                onChange: (_, newValues) => {
                  setState({
                    ...state,
                    [elem.type]: {
                      ...state[elem.type],
                      [prop]: (newValues as any)?.value,
                    },
                  });
                },
              })}
            </div>
          ))}
          {libs.map((lib) => (
            <SubSection key={lib.title} title={lib.title}>
              {(lib.elements as any)[elem.type]
                ? React.createElement((lib.elements as any)[elem.type], { ...state[elem.type] })
                : `Elem ${elem.type} not found in lib ${lib.title}`}
            </SubSection>
          ))}
          <br />
          <br />
          <br />
          {libs.map((lib) => (
            <SubSection key={lib.title} title={lib.title}>
              {(lib.elements as any)[elem.type]
                ? Object.keys(elem.propsOptions).map((prop: any, index: any) =>
                    elem.propsOptions[prop].map((option, innerIndex) => {
                      return React.createElement((lib.elements as any)[elem.type], {
                        [prop]: option,
                        key: `${index}-${innerIndex}`,
                      });
                    })
                  )
                : `Elem ${elem.type} not found in lib ${lib.title}`}
            </SubSection>
          ))}
        </Section>
      ))}
    </div>
  );
};
