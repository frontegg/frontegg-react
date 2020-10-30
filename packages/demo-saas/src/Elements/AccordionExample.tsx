import React, { FC, useState } from 'react';
import { Section, SubSection } from 'Sections/Sections';
import { Libraries, Library } from './Libraries';

export const AccordionExample: FC = () => {
  return (
    <Section title='Accordions'>
      {Libraries.map((lib) => (
        <SubSection key={lib.title} title={lib.title}>
          <AccordionByLib lib={lib} />
        </SubSection>
      ))}
    </Section>
  );
};

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
