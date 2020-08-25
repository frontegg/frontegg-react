import React, { ComponentType } from 'react';
import ReactDOM from 'react-dom';

export const authPageWrapper = (Component: ComponentType<any>, displayName: string): ComponentType<any> =>
  class extends React.Component<any> {
    static displayName = displayName;
    static defaultProps = {
      header: <img src='http://acmelogos.com/images/logo-1.svg' alt='logo'/>,
    };

    render() {
      const component = <div className='frontegg'>
        <div className='fe-login-page'>
          <div className='fe-login-container'>
            <div className='fe-login-header'>
              {this.props.header}
            </div>
            <Component/>
          </div>
        </div>
      </div>;
      return ReactDOM.createPortal(component, document.body);
    }
  };
