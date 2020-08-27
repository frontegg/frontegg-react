import React, { ComponentType, ReactNode } from 'react';
import ownKeys = Reflect.ownKeys;

export class EmptyRender extends React.Component<any, any> {
  render() {return null;}
}

export type ComponentsTypesWithProps<E> = {
  [P in keyof Partial<E>]: ComponentType<E[P]> | Partial<E[P]> | null
}

export type ComponentsTypeProps<E> = {
  [P in keyof Partial<E>]: E[P] | null
}
export type ComponentsTypes<E> = {
  [P in keyof E]: ComponentType<E[P]>
}

export type PartialInnerTypes<E> = {
  [P in keyof E]: Partial<E[P]>
}

export type RendererFunction<P, C, R = ReactNode> = (props: Omit<P, 'renderer' | 'components'>, components?: ComponentsTypes<C>) => R | null

export function memoEqual(prevProps: any, nextProps: any) {
  return Object.keys(nextProps).reduce((p: boolean, next: any) => {
    if (typeof prevProps[next] === 'function' && typeof nextProps[next] === 'function') {
      return p;
    }
    if (prevProps[next] !== nextProps[next]) {
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
    if (typeof prevProps[next] === 'function' && typeof nextProps[next] === 'function') {
      return p;
    }
    if (prevProps[next] !== nextProps[next]) {
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
    const comp = components?.[component];
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


export const generateComponent = <T extends {}, P>(
  components: Partial<P> | undefined | null,
  component: keyof P,
  DefaultComponent: ComponentType<any>,
): any => {
  if (components?.hasOwnProperty(component)) {
    const comp = components?.[component];
    if (comp == null) {
      return EmptyRender;
    }
    if (typeof comp === 'function') {
      return comp;
    }
  }
  return React.memo(DefaultComponent as any, memoEqual);
};

export const buildComponents = <P>(components: any, defaultComponents: P): P => {
  if (!components) {
    return defaultComponents;
  }
  return ownKeys(defaultComponents as any)
    .map((compName: any) => ({ [compName as string]: generateComponent(components, compName as string, (defaultComponents as any)[compName]) }))
    .reduce((p: any, comp: any) => ({ ...p, ...comp }), {});
};

export const buildComponentsProps = <P>(configComponents: P, propsComponents: P) => {
  const props: any = {};

  const merger = (comps: any) => {
    Object.keys(comps || {}).map(key => {
      if (comps[key] === null) {
        props[key] = null;
        return;
      }
      if (props.hasOwnProperty(key)) {
        props[key] = {
          ...(props[key] || {}),
          ...comps[key],
        };
      } else {
        props[key] = comps[key];
      }
    });
  };
  merger(configComponents);
  merger(propsComponents);

  return props;
};

export const cloneComponentsWithProps = <P>(components: ComponentsTypes<P>, configProps: PartialInnerTypes<P>): ComponentsTypes<P> => {
  const cloned: any = components;
  Object.keys(configProps).forEach(key => {
    if ((cloned as any)[key] != null) {
      cloned[key] = (props: any) => React.createElement(cloned[key], { ...configProps, ...props });
    }
  });
  return cloned as ComponentsTypes<P>;
};

export class FronteggClass<COMPS, P extends {
  components?: ComponentsTypesWithProps<COMPS>;
  config?: ComponentsTypeProps<COMPS>;
} = {}, S = {}> extends React.Component<P, S> {
  declare compsProps: PartialInnerTypes<COMPS>;
  declare comps: ComponentsTypes<COMPS>;

  constructor(props: P, defaultComponents: ComponentsTypes<COMPS>) {
    super(props);
    this.compsProps = buildComponentsProps(this.props.config ?? {}, this.props.components ?? {});
    this.comps = buildComponents(this.compsProps, defaultComponents);
  }
}
