import { Elements, ElementType } from '@frontegg/react-core';

export type PropsOf<TComponentOrTProps> = TComponentOrTProps extends React.ComponentType<infer TProps>
  ? TProps
  : TComponentOrTProps;

export type PropsOfElement<T extends ElementType> = PropsOf<Elements[T]>;

export type PropToOptions<T extends ElementType> = {
  [prop in keyof PropsOfElement<T>]: PropsOfElement<T>[prop][];
};

export interface ElementOption<T extends ElementType> {
  title: string;
  type: T;
  propToOptions: PropToOptions<T>;
}

export type ElementOptions = {
  [type in ElementType]?: ElementOption<type>;
};
