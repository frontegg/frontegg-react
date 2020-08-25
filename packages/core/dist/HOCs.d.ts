import { ComponentType } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
export { withTranslation as withT, WithTranslation as WithT, };
export declare function memoEqual(prevProps: any, nextProps: any): boolean;
export declare type UseMapper<S, A> = {
    state: (state: S) => Partial<S>;
    actions: (actions: A) => Partial<A>;
};
export declare const withPlugin: <S, A>(pluginName: string, defaultMapper: UseMapper<S, A>, pluginActions: A) => <P extends unknown>(Component: ComponentType<P>, mapper: UseMapper<S, A>) => ComponentType<Pick<P, Exclude<keyof P, keyof S | keyof A>>>;
