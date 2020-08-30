import React, { ComponentType, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export const authPageWrapper = <P extends {}>(Component: ComponentType<P>, displayName: string): ComponentType<P & { header?: ReactNode }> =>
  (props: P & { header?: ReactNode }) => {
    const {
      header = <img src='http://acmelogos.com/images/logo-1.svg' alt='logo'/>,
    } = props;
    const component = <div className='frontegg'>
      <div className='fe-login-page'>
        <div className='fe-login-container'>
          <div className='fe-login-header'>
            {header}
          </div>
          <Component {...props}/>
        </div>
      </div>
    </div>;
    return ReactDOM.createPortal(component, document.body);
  };

