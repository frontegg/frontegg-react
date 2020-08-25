import React, { ComponentType, ReactNode } from 'react';
export declare class EmptyRender extends React.Component<any, any> {
    render(): null;
}
export declare type ComponentsTypesWithProps<E> = {
    [P in keyof Partial<E>]: ComponentType<E[P]> | Partial<E[P]> | null;
};
export declare type ComponentsTypeProps<E> = {
    [P in keyof Partial<E>]: E[P] | null;
};
export declare type ComponentsTypes<E> = {
    [P in keyof E]: ComponentType<E[P]>;
};
export declare type PartialInnerTypes<E> = {
    [P in keyof E]: Partial<E[P]>;
};
export declare type RendererFunction<P, C, R = ReactNode> = (props: Omit<P, 'renderer' | 'components'>, components?: ComponentsTypes<C>) => R | null;
export declare function memoEqual(prevProps: any, nextProps: any): boolean;
export declare function memoEqualNoChildren(prevProps: any, nextProps: any): boolean;
export declare const buildDynamicComponent: <T extends {}, P>(components: Partial<P> | null | undefined, component: keyof P, DefaultComponent: ComponentType<any>) => any;
export declare const buildPropsComponents: <P>(components: any, defaultComponents: P) => P;
export declare const generateComponent: <T extends {}, P>(components: Partial<P> | null | undefined, component: keyof P, DefaultComponent: ComponentType<any>) => any;
export declare const buildComponents: <P>(components: any, defaultComponents: P) => P;
export declare const buildComponentsProps: <P>(configComponents: P, propsComponents: P) => any;
export declare const cloneComponentsWithProps: <P>(components: ComponentsTypes<P>, configProps: PartialInnerTypes<P>) => ComponentsTypes<P>;
export declare class FronteggClass<COMPS, P extends {
    components?: ComponentsTypesWithProps<COMPS>;
    config?: ComponentsTypeProps<COMPS>;
} = {}, S = {}> extends React.Component<P, S> {
    compsProps: PartialInnerTypes<COMPS>;
    comps: ComponentsTypes<COMPS>;
    constructor(props: P, defaultComponents: ComponentsTypes<COMPS>);
}
