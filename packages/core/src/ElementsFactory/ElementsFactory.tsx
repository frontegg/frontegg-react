import React from 'react';
import { Elements, ElementType } from './interfaces';

import { FeButton } from '../elements/Button/FeButton';
import { FeGrid } from '../elements/Grid/FeGrid';
import { FeIcon } from '../elements/Icon/FeIcon';
import { FeLoader } from '../elements/Loader/FeLoader';
import { FePopup } from '../elements/Popup/FePopup';
import { FeCheckbox } from '../elements/Checkbox/FeCheckbox';
import { FeTag } from '../elements/Tag/FeTag';
import { FeSelect } from '../elements/Select/FeSelect';
import { FeAccordion } from '../elements/Accordion/FeAccordion';
import { FeAccordionHeader } from '../elements/Accordion/FeAccordion';
import { FeAccordionContent } from '../elements/Accordion/FeAccordion';
import { FeInput } from '../elements/Input/FeInput';
import { FeSwitchToggle } from '../elements/SwitchToggle/FeSwitchToggle';
import { FeTable } from '../elements/Table/FeTable';
import { FeForm } from '../elements/Form/FeForm';
import { FeTabs } from '../elements/Tabs/FeTabs';
import { FeMenu } from '../elements/Menu/FeMenu';
import { FeMenuItem } from '../elements/MenuItem/FeMenuItem';
import { FeDialog } from '../elements/Dialog/FeDialog';
import { FeInputChip } from '../elements/InputChip/FeInputChip';
import { FePagination } from '../elements/Pagination/FePagination';

export const fronteggElements: Elements = {
  Accordion: FeAccordion,
  AccordionHeader: FeAccordionHeader,
  AccordionContent: FeAccordionContent,
  Loader: FeLoader,
  Tag: FeTag,
  Button: FeButton,
  Input: FeInput,
  InputChip: FeInputChip,
  Grid: FeGrid,
  Icon: FeIcon,
  Popup: FePopup,
  Pagination: FePagination,
  Checkbox: FeCheckbox,
  Select: FeSelect,
  SwitchToggle: FeSwitchToggle,
  Table: FeTable,
  Form: FeForm,
  Tabs: FeTabs,
  Menu: FeMenu,
  MenuItem: FeMenuItem,
  Dialog: FeDialog,
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
