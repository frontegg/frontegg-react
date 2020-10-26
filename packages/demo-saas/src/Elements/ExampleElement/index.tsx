import { ElementType } from '@frontegg/react-core';
import React, { ReactElement, useState } from 'react';
import { Section, SubSection } from 'Sections/Sections';
import { ElementOption, PropToOptions } from '../interfaces';
import { Libraries } from '../Libraries';
import './style.scss';

interface ExampleElementProps<T extends ElementType> {
  elementOption: ElementOption<T>;
}

export function ExampleElement<T extends ElementType>({
  elementOption,
}: ExampleElementProps<T>): ReactElement<ExampleElementProps<T>> {
  const [propToValue, setPropToValue] = useState(() => getInitialState(elementOption.propToOptions));
  return (
    <div>
      <Section title='Props'>
        {getKeys(elementOption.propToOptions).map((prop, index) => (
          <div className='prop-select' key={index}>
            {React.createElement(Libraries[2].elements.Select, {
              fullWidth: false,
              label: `${prop}`,
              value: propToValue[prop],
              getOptionLabel: (label) => `${label.label || label.value || label}`,
              options: elementOption.propToOptions[prop]
                .filter((_) => _ !== undefined)
                .map((option) => ({ label: `${option}`, value: option })),
              onChange: (_, newValues) => {
                setPropToValue({
                  ...propToValue,
                  [prop]: (newValues as any)?.value,
                });
              },
            })}
          </div>
        ))}
      </Section>
      <Section title={elementOption.title}>
        {Libraries.map((lib) => (
          <SubSection title={lib.title} key={lib.title}>
            {(lib.elements as any)[elementOption.type]
              ? React.createElement((lib.elements as any)[elementOption.type], { ...propToValue })
              : `Element ${elementOption.type} not found in library ${lib.title}`}
          </SubSection>
        ))}
      </Section>
    </div>
  );
}

const getInitialState = <T extends ElementType>(
  propToOptions: PropToOptions<T>
): {
  [prop in keyof PropToOptions<T>]?: PropToOptions<T>[prop]; // Should be `PropToOptions<T>[prop][0]` or somethig like that
} =>
  getKeys(propToOptions).reduce(
    (agg, prop) => ({
      ...agg,
      [prop]: propToOptions[prop][0],
    }),
    {}
  );

const getKeys = <T extends ElementType>(propToOptions: PropToOptions<T>) =>
  Object.keys(propToOptions) as (keyof PropToOptions<T>)[];
