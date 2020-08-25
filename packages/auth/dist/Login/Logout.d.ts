import React from 'react';
import { AuthActions, AuthState } from '../Api';
declare const mapper: {
    state: ({ loginUrl }: AuthState) => {
        loginUrl: string;
    };
    actions: ({ logout }: AuthActions) => {
        logout: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[payload: import("../Api").LogoutPayload], import("../Api").LogoutPayload, string, never, never>;
    };
};
declare type Props = ReturnType<typeof mapper.state> & ReturnType<typeof mapper.actions>;
export declare const Logout: React.ComponentType<Pick<Props, never>>;
export declare const LogoutPage: React.ComponentType<any>;
export {};
