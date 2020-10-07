import React, { ComponentType, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { HeaderProps } from '../interfaces';

export const authPageWrapper = <P extends {}>(
  Component: ComponentType<P>,
): ComponentType<P & HeaderProps> => (props: P & HeaderProps) => {
  const header = props.header ?? <img src={props.headerImg ?? '//acmelogos.com/images/logo-1.svg'} alt='logo' />;
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
