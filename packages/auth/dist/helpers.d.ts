import { AuthActions, AuthState } from './Api';
export declare type AuthMapper = {
    state: (state: AuthState) => any;
    actions: (actions: AuthActions) => any;
};
export declare const defaultMapper: AuthMapper;
export declare const createMapper: (mapper: Partial<AuthMapper>) => {
    state: (state: AuthState) => any;
    actions: (actions: AuthActions) => any;
};
