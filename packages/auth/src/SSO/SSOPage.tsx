import React, { FC, useMemo } from 'react';
import { SSORouter } from './SSORouter';
import { useRootPath, checkValidChildren, RootPathContext } from '@frontegg/react-core';
import { SSOHeader } from './SSOHeader';
import { BasePageProps } from '../interfaces';

export type SSOPageProps = BasePageProps;
export const SSOPage: FC<SSOPageProps> = (props) => {
  const [rootPath] = useRootPath(props, '/sso');
  useMemo(() => checkValidChildren('SSO.Page', 'SSO', props.children, { SSORouter }), [props.children]);

  const children = props.children ?? (
    <>
      <SSOHeader />
      <SSORouter />
    </>
  );

  return (
    <RootPathContext.Provider value={rootPath}>
      <div className='fe-sso-page'>{children}</div>
    </RootPathContext.Provider>
  );
};
