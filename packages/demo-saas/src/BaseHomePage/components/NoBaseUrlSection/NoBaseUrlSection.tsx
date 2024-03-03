import React from 'react';
import logo from './logo.svg';
import fronteggLogo from './fronteggLogo.svg';
import './NoBaseUrlSection.css';

export const NoBaseUrlSection = () => (
  <div className='App'>
    <header className='App-header'>
      <div className='App-logo-container'>
        <img src={logo} className='App-logo' alt='logo' />
        <span className='App-logo-separator'>+</span>
        <img src={fronteggLogo} className='Frontegg-logo' alt='logo' />
      </div>

      <p>
        Honey, edit <code>FronteggOptions {'{ baseUrl: "" }'}</code> to connect to your application
      </p>

      <a className='App-link' href='https://docs.frontegg.com' target='_blank' rel='noopener noreferrer'>
        Learn how to use Frontegg
      </a>
    </header>
  </div>
);
