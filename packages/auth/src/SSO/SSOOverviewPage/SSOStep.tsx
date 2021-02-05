import React from 'react';
import { Link } from 'react-router-dom';
import { RendererFunction, Icon, WithT } from '@frontegg/react-core';

export interface SSOStepProps extends Pick<WithT, 't'> {
  renderer?: RendererFunction<SSOStepProps>;
  num: number;
  title: string;
  subtitle?: string;
  optional?: boolean;
  configured: boolean;
  to: string;
}

export class SSOStep extends React.Component<SSOStepProps> {
  render() {
    const { t, num, title, subtitle, configured, to, optional } = this.props;
    return (
      <Link to={to} className='fe-sso-step'>
        <div className='fe-sso-step__inner'>
          <div className='fe-sso-step__header'>
            <span>
              {t('common.step', { num })} {optional && `(${t('common.optional')})`}
            </span>
            <span className='fe-sso-step__checkmark' data-test-id='IDP-checkmark'>
              {configured && <Icon name='checkmark' data-test-id='domain-checkmark' />}
            </span>
          </div>
          <div className='fe-sso-step__title'>{title}</div>
          <div className='fe-sso-step__subtitle'>{subtitle}</div>
        </div>
        {configured ? (
          <div className='fe-sso-step__info'>
            <span>{t('common.configured')}</span>
            <span style={{ color: '#4183c4' }}>{t('common.edit')}</span>
          </div>
        ) : (
          <div className='fe-sso-step__info'>{t('common.not-configured')}</div>
        )}
      </Link>
    );
  }
}
