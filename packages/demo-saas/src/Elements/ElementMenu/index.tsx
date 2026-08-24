import { ElementType } from '@frontegg/react-core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { elements } from '../elements';
import './style.scss';

interface ElementMenuProps {
  basePath: string;
  activeElement: string;
}

export const ElementMenu: FC<ElementMenuProps> = ({ basePath, activeElement }) => {
  return (
    <div className='side-menu'>
      <Link className={`link ${activeElement === 'Accordion' ? 'link-active' : ''}`} to={`${basePath}/Accordion`}>
        Accordions
      </Link>
      {Object.keys(elements).map((elementType) => (
        <Link
          className={`link ${activeElement === elementType ? 'link-active' : ''}`}
          key={elementType}
          to={`${basePath}/${elementType}`}
        >
          {elements[elementType as ElementType]?.title}
        </Link>
      ))}
    </div>
  );
};
