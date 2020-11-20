import { Elements } from '@frontegg/react-core';
import { Button } from './Button';
import { Input } from './Input';
import { Form } from './Form';
import { Loader } from './Loader';
import { SwitchToggle } from './SwitchToggle';
import { Tabs } from './Tabs';
import { Icon } from './Icon';
import { Dialog } from './Dialog';
import { Popup } from './Popup';
import { Checkbox } from './Checkbox';
import { InputChip } from './InputChip';

import { Tag } from './Tag';
import { Accordion, AccordionContent, AccordionHeader } from './Accordion';
import { Select } from './Select';

export const type = 'semantic';
export const version = '1.2.1';
export const uiLibrary: Partial<Elements> = {
  Accordion,
  AccordionContent,
  AccordionHeader,
  Button,
  Input,
  Form,
  Loader,
  InputChip,
  SwitchToggle,
  Tabs,
  Icon,
  Dialog,
  Popup,
  Checkbox,
  Tag,
  Select,
};
