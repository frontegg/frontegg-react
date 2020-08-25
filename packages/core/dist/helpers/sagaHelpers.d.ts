import { ContextOptions } from '../interfaces';
import { PayloadAction } from '@reduxjs/toolkit';
export declare function getContext(): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<true>, ContextOptions, unknown>;
export declare const reducerActionOnly: <S, T>() => {
    prepare: (payload: T) => {
        payload: T;
    };
    reducer: (state: S) => S;
};
export declare const reducerResetByState: <S>(key: keyof S, preloadedState: S) => () => S;
export declare const reducerResetByKey: <S, T>(key: keyof S, preloadedState: S) => (state: S) => S & {
    [x: string]: S[keyof S];
};
export declare const reducerByState: <S, T>(key: keyof S) => (state: S, { payload }: {
    payload: T;
    type: string;
}) => S & {
    [x: string]: T;
};
export declare const reducerBySubState: <S, T>(key: keyof S) => {
    prepare: (payload: Partial<T>) => {
        payload: Partial<T>;
    };
    reducer: (state: S, { payload }: {
        payload: Partial<T>;
        type: string;
    }) => S & {
        [x: string]: S[keyof S] & Partial<T>;
    };
};
