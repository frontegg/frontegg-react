import React from 'react';
import { AuthActions, AuthState } from '../Api';
declare const mapper: {
    state: ({ loginState, isSSOAuth, onRedirectTo, forgetPasswordUrl }: AuthState) => {
        loginState: import("../Api").LoginState;
        isSSOAuth: boolean;
        onRedirectTo: (path: string, opts?: import("@frontegg/react-core").RedirectOptions | undefined) => void;
        forgetPasswordUrl: string;
    };
    actions: ({ preLogin, login, setLoginState, resetLoginState, setForgotPasswordState }: AuthActions) => {
        preLogin: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[payload: import("../Api").PreLoginPayload], import("../Api").PreLoginPayload, string, never, never>;
        login: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[payload: import("../Api").LoginPayload], import("../Api").LoginPayload, string, never, never>;
        setLoginState: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[payload: Partial<import("../Api").LoginState>], Partial<import("../Api").LoginState>, string, never, never>;
        resetLoginState: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
        setForgotPasswordState: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[payload: Partial<import("../Api").ForgotPasswordState>], Partial<import("../Api").ForgotPasswordState>, string, never, never>;
    };
};
declare type Props = ReturnType<typeof mapper.state> & ReturnType<typeof mapper.actions>;
export declare const LoginWithPassword: React.ComponentType<Pick<Props, never>>;
export {};
