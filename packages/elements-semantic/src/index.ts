import { Elements } from '@frontegg/react-core';
import { Button } from './Button';
import { Input } from './Input';
import { DatePicker } from './DatePicker';
import { Form } from './Form';
import { Loader } from './Loader';
import { SwitchToggle } from './SwitchToggle';
import { Tabs } from './Tabs';
import { Icon } from './Icon';
import { Dialog } from './Dialog';
import { Popup } from './Popup';
import { Checkbox } from './Checkbox';
import { Tag } from './Tag';

export const type = 'semantic';
export const version = '1.2.1';
export const uiLibrary: Partial<Elements> = {
  Button,
  Input,
  DatePicker,
  Form,
  Loader,
  SwitchToggle,
  Tabs,
  Icon,
  Dialog,
  Popup,
  Checkbox,
  Tag,
};
