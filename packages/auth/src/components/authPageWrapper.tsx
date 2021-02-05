import React, { ComponentType } from 'react';
import ReactDOM from 'react-dom';
import { HeaderProps } from '../interfaces';

const DEFAULT_IMAGE = 'https://assets.frontegg.com/public-frontegg-assets/logo-transparent.png';

export const authPageWrapper = <P extends {}>(Component: ComponentType<P>): ComponentType<P & HeaderProps> => (
  props: P & HeaderProps
) => {
  const header = props.header ?? <img src={props.headerImg ?? DEFAULT_IMAGE} alt='logo' />;
  const component = (
    <div className='fe-login-page'>
      <div className='fe-login-container'>
        <div className='fe-login-header'>{header}</div>
        <Component {...props} />
      </div>
    </div>
  );
  return ReactDOM.createPortal(component, document.body);
};
