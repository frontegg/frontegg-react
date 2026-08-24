import React, { FC } from 'react';
import { ElementType } from '@frontegg/react-core';
import { Route, RouteComponentProps } from 'react-router-dom';
import { AccordionExample } from './AccordionExample';
import { elements } from './elements';
import { ElementMenu } from './ElementMenu';
import { ExampleElement } from './ExampleElement';

export const ElementsPage: FC<RouteComponentProps> = ({ match, location }) => {
  return (
    <div>
      <ElementMenu basePath={match.path} activeElement={location.pathname.split('/').slice(-1)[0]} />

      <Route exact path={`${match.path}/Accordion`}>
        <AccordionExample />
      </Route>
      {Object.keys(elements).map((elementType) => (
        <Route exact key={elementType} path={`${match.path}/${elementType}`}>
          <ExampleElement elementOption={elements[elementType as ElementType] as any} />
        </Route>
      ))}
    </div>
  );
};
