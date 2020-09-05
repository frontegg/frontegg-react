import React, { ComponentType } from 'react';
import { WithT, withT, RendererFunction, Button, omitProps } from '@frontegg/react-core';
import { AuthActions, AuthState } from '../Api';
import { withAuth } from '../HOCs';

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo });
const actionsMapper = ({ resetActivateState }: AuthActions) => ({ resetActivateState });

export interface ActivateAccountFailedRedirectProps {
  renderer?: RendererFunction<Props, ActivateAccountFailedRedirectProps>
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & ActivateAccountFailedRedirectProps

class ActivateAccountFailedRedirectComponent extends React.Component<Props> {

  render() {
    const { renderer, t, routes: { loginUrl }, onRedirectTo, resetActivateState } = this.props;

    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']));
    }
    return <>
      <div className='fe-center fe-error-message'>
        {t('auth.activate-account.failed-title')}
        <br/>
        {t('auth.activate-account.failed-description')}
      </div>
      <Button fullWidth onClick={() => {
        resetActivateState();
        onRedirectTo(loginUrl);
      }}>
        {t('auth.activate-account.back-to-login')}
      </Button>
    </>;
  }
}

export const ActivateAccountFailedRedirect = withAuth(
  withT()(ActivateAccountFailedRedirectComponent),
  stateMapper,
  actionsMapper,
) as ComponentType<ActivateAccountFailedRedirectProps>;
