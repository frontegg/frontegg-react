import React from 'react';
import { Elements, ElementType } from './interfaces';

export class ElementsFactory {
  private static instance: ElementsFactory;
  private elements: Elements | null = null;

  private constructor() { }

  private static getInstance(): ElementsFactory {
    if (!ElementsFactory.instance) {
      ElementsFactory.instance = new ElementsFactory();
    }
    return ElementsFactory.instance;
  }

  public static setElements = (elements: Elements) => {
    if (elements == null) {
      throw Error('You must pass UI Library to FronteggProvider');
    } else {
      ElementsFactory.getInstance().elements = elements;
    }
  };

  public static getElement = <P extends ElementType>(type: P): Elements[P] => {
    const { elements } = ElementsFactory.getInstance();
    if (!elements) {
      throw Error('You must pass UI Library to FronteggProvider');
    }

    return elements[type];
  };
}


