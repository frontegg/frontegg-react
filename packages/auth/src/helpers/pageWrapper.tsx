import React, { ComponentType } from 'react';
import { AuthPageProps } from '../interfaces';
import ReactDOM from 'react-dom';

export const pageWrapper = (Component: ComponentType, displayName: string): ComponentType<AuthPageProps> =>
  class extends React.Component<AuthPageProps> {
    static displayName = displayName;
    static defaultProps = {
      header: <img src='http://acmelogos.com/images/logo-1.svg' alt='logo'/>,
    };

    render() {
      const component = <div className='frontegg fe-login-page'>
        <div className='fe-login-container'>
          <div className='fe-login-header'>
            {this.props.header}
          </div>
          <Component/>
        </div>
      </div>;
      return ReactDOM.createPortal(component, document.body);
    }
  };
