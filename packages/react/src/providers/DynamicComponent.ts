import React, { ComponentType } from 'react';
import ownKeys = Reflect.ownKeys;

export class EmptyRender extends React.Component<any, any> {
  render() {return null;}
}

export type ComponentsTypesWithProps<E> = {
  [P in keyof Partial<E>]: ComponentType<E[P]> | E[P] | null
}
export type ComponentsTypes<E> = {
  [P in keyof E]: ComponentType<E[P]>
}

export function memoEqual(prevProps: any, nextProps: any) {
  return Object.keys(nextProps).reduce((p: boolean, next: any) => {
    if (typeof prevProps[next] == 'function' && typeof nextProps[next] == 'function') {
      return p;
    }
    if (prevProps[next] != nextProps[next]) {
      return p && false;
    } else {
      return p;
    }
  }, true);
}

export function memoEqualNoChildren(prevProps: any, nextProps: any) {
  return Object.keys(nextProps).reduce((p: boolean, next: any) => {
    if (next === 'children') {
      return p;
    }
    if (typeof prevProps[next] == 'function' && typeof nextProps[next] == 'function') {
      return p;
    }
    if (prevProps[next] != nextProps[next]) {
      return p && false;
    } else {
      return p;
    }
  }, true);
}

export const buildDynamicComponent = <T extends {}, P>(
  components: Partial<P> | undefined | null,
  component: keyof P,
  DefaultComponent: ComponentType<any>,
): any => {
  if (components?.hasOwnProperty(component)) {
    let comp = components?.[component];
    if (comp == null) {
      return EmptyRender;
    }
    if (typeof comp === 'function') {
      return comp;
    }
    return React.memo((props) => {
      return React.createElement(DefaultComponent, { ...comp, ...props });
    }, memoEqual);
  }
  return React.memo(DefaultComponent as any, memoEqual);
};

export const buildPropsComponents = <P>(components: any, defaultComponents: P): P => {
  if (!components) {
    return defaultComponents;
  }
  return ownKeys(defaultComponents as any)
    .map((compName: any) => ({ [compName as string]: buildDynamicComponent(components, compName as string, (defaultComponents as any)[compName]) }))
    .reduce((p: any, comp: any) => ({ ...p, ...comp }), {});
};
