import React from 'react';
import { AuthActions, AuthState } from '../Api';
declare const mapper: {
    state: ({ authenticatedUrl }: AuthState) => {
        authenticatedUrl: string;
    };
    actions: ({ resetLoginState }: AuthActions) => {
        resetLoginState: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    };
};
declare type Props = ReturnType<typeof mapper.state> & ReturnType<typeof mapper.actions>;
declare const _default: React.ComponentType<Pick<Props, never>>;
export default _default;
