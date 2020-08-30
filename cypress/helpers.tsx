import React, { FC } from 'react';
import { FronteggProviderWithRouter, PluginConfig, ContextOptions } from '@frontegg/react-core';

export const METADATA_SERVICE = 'http://localhost:8080/frontegg/metadata';
export const IDENTITY_SERVICE = 'http://localhost:8080/frontegg/identity';


const contextOptions: ContextOptions = {
  baseUrl: `http://localhost:8080`,
  tokenResolver: () => 'my-authentication-token',
  requestCredentials: 'include',
};

export type TestFronteggWrapperProps = {
  plugins: PluginConfig[]
}
export const TestFronteggWrapper: FC<TestFronteggWrapperProps> = (props) => {
  return <FronteggProviderWithRouter
    context={contextOptions}
    plugins={props.plugins}>
    {props.children}
  </FronteggProviderWithRouter>;
};
