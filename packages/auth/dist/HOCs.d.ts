import React, { ComponentType, FC } from 'react';
import { RouteProps } from 'react-router';
import { AuthMapper } from './helpers';
export declare const withAuth: <P extends unknown>(Component: React.ComponentType<P>, mapper: AuthMapper) => React.ComponentType<Pick<P, Exclude<keyof P, string | number | symbol>>>;
export declare const withProtectedRoute: <P extends {}>(Component: React.ComponentType<P>) => React.ComponentType<Pick<P & {
    isAuthenticated: boolean;
    loginUrl: string;
    isLoading: boolean;
}, Exclude<keyof P, string | number | symbol>>>;
export declare const ProtectedComponent: FC;
export declare class ProtectedRoute extends React.Component<RouteProps> {
    render(): JSX.Element;
}
export declare const ProtectedArea: FC;
