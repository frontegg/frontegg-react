import React, { FC, isValidElement, ReactElement, useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { FronteggAppInstance } from '@frontegg/types';
import { isElement } from 'react-is';

export class CustomComponentHolder {
  private static components: { [name in string]: ReactElement } = {};

  public static set(name: string, element: any) {
    CustomComponentHolder.components[name] = element;
  }

  public static get(name: string): ReactElement {
    return CustomComponentHolder.components[name];
  }
}

const overrideValue = (object: any, key: string, value: any) => {
  const keys: string[] = key.split('.');
  let iterator = object;
  while (keys.length > 1) {
    iterator = iterator[keys.shift() as any];
  }
  iterator[keys.shift() as any] = value;
};
const Registerer: FC<{ app: FronteggAppInstance; themeKey: string }> = (props) => {
  const { app, themeKey } = props;
  const value = CustomComponentHolder.get(themeKey);
  const [mounted, setMounted] = useState(false);

  const mount = useCallback(() => {
    setMounted(true);
  }, []);
  const unmount = useCallback(() => {
    setMounted(false);
  }, []);

  overrideValue(app.options.themeOptions!, themeKey, { type: 'slot', themeKey, mount, unmount });

  let element = app.loginBoxContainer?.querySelector(`[slot="${themeKey}"]`);
  if (!element && typeof document !== undefined) {
    element = document.createElement('div');
    element.slot = themeKey;
    app.loginBoxContainer?.appendChild(element);
  }

  return element && mounted ? <React.Fragment>{ReactDOM.createPortal(value, element)}</React.Fragment> : <></>;
};

export const CustomComponentRegister: FC<{ app: FronteggAppInstance; themeOptions: any }> = ({ app, themeOptions }) => {
  const keys = useMemo(() => {
    if (!themeOptions || !themeOptions.loginBox) {
      return [];
    }
    const loop = (key: string, obj: any, keyPath: string): string[] => {
      if (typeof obj !== 'object' && typeof obj !== 'function') {
        return [];
      }
      if (typeof obj === 'function') {
        try {
          obj = React.createElement(obj);
          if (isValidElement(obj) || isElement(obj)) {
            const generatedKey = `${keyPath}.${key}`;
            CustomComponentHolder.set(generatedKey, obj);
            return [generatedKey];
          }
        } catch (e) {}
      }
      if (isValidElement(obj) || isElement(obj)) {
        const generatedKey = `${keyPath}.${key}`;
        CustomComponentHolder.set(generatedKey, obj);
        return [generatedKey];
      } else {
        const elements: string[] = [];
        Object.keys(obj).forEach((k) => {
          elements.push(...loop(k, obj[k], keyPath === '' ? key : `${keyPath}.${key}`));
        });
        return elements;
      }
    };
    return loop('loginBox', themeOptions.loginBox, '');
  }, []);

  return (
    <>
      {keys.map((key) => (
        <Registerer key={key} app={app} themeKey={key} />
      ))}
    </>
  );
};
