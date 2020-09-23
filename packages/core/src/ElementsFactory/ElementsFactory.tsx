import React from 'react';
import { Elements, ElementType } from './interfaces';
import { FeGrid } from '../elements/Grid/FeGrid';
import { FeButton } from '../elements/Button/FeButton';


const fronteggElements: Partial<Elements> = {
  Button: FeButton,
  Grid: FeGrid,
};


export class ElementsFactory {
  private static instance: ElementsFactory;
  private elements: Elements | null = null;

  private constructor() {}

  private static getInstance(): ElementsFactory {
    if (!ElementsFactory.instance) {
      ElementsFactory.instance = new ElementsFactory();
    }
    return ElementsFactory.instance;
  }

  public static setElements = (elements?: Partial<Elements>) => {
    ElementsFactory.getInstance().elements = {
      ...fronteggElements,
      ...elements,
    } as any;
  };

  public static getElement = <P extends ElementType>(type: P): Elements[P] => {
    const { elements } = ElementsFactory.getInstance();
    if (!elements) {
      throw Error('You must pass UI Library to FronteggProvider');
    }

    return elements[type];
  };
}
