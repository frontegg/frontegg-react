import React from 'react';
import { RendererFunction } from '@frontegg/react-core';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export interface SSOStepProps {
  renderer?: RendererFunction<SSOStepProps>
  num: number;
  title: string;
  subtitle?: string;
  configured: boolean;
  to: string;
}

export class SSOStep extends React.Component<SSOStepProps> {

  render() {
    const { num, title, subtitle, configured, to } = this.props;
    return (
      <Link to={to}>
        <div className='fe-sso-step'>
          <div className='fe-sso-step__inner'>
            <div className='fe-sso-step__header'>
              <span>Step {num}</span>
              <span className='fe-sso-step__checkmark'>
              {configured && <Icon size='large' name='checkmark'/>}
            </span>
            </div>
            <div className='fe-sso-step__title'>
              {title}
            </div>
            <div className='fe-sso-step__subtitle'>
              {subtitle}
            </div>

          </div>
          {configured ? <div className='sso-step__info'>Configured</div> :
            <div className='sso-step__info'>Not configured</div>}
        </div>
      </Link>
    );
  }
}

