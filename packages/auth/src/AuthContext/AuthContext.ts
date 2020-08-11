import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { actions, authInitialState, AuthProviderState } from '../Api';


export const sagaState = (state: AuthProviderState) => state;

export const sagaActions = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export type IAuthContext = { onRedirectTo: (path: string) => void } & ReturnType<typeof sagaActions> & ReturnType<typeof sagaState>

export const AuthContext = React.createContext<IAuthContext>(authInitialState as IAuthContext);
