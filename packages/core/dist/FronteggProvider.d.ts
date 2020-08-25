import React from 'react';
import { Task } from 'redux-saga';
import { Reducer } from '@reduxjs/toolkit';
import { ContextOptions } from './interfaces';
import * as H from 'history';
export declare type RedirectOptions = {
    refresh?: boolean;
    replace?: boolean;
};
export interface PluginConfig {
    storeName: string;
    reducer: Reducer;
    sagas: () => void;
    preloadedState: any;
    Listener?: React.ComponentType;
}
export interface FronteggProviderProps {
    history: H.History;
    context: ContextOptions;
    plugins: PluginConfig[];
}
export declare class FronteggProvider extends React.Component<FronteggProviderProps> {
    store: any;
    task: Task;
    listeners: React.ComponentType[];
    constructor(props: FronteggProviderProps);
    componentWillUnmount(): void;
    componentDidMount(): void;
    overrideState: () => {
        onRedirectTo: (path: string, opts?: RedirectOptions | undefined) => void;
    };
    onRedirectTo: (path: string, opts?: RedirectOptions | undefined) => void;
    render(): JSX.Element;
}
